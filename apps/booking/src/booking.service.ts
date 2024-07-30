import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { BookingServiceProviders } from './enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import { InjectModel } from '@nestjs/sequelize';
import { FlightBooking } from './models/booking.model';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaymentsServiceEvents } from '@app/core/enums/payments-service.events.enum';
import { FlightsServiceEvents } from '@app/core/enums/flights-service-events.enum';
import { isDefined } from 'class-validator';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BookingServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT)
    private readonly externalApiIntegrationServiceClient: ClientProxy,
    @Inject(BookingServiceProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsServiceClient: ClientProxy,
    @Inject(BookingServiceProviders.PAYMENTS_SERVICE_CLIENT)
    private readonly paymentsServiceClient: ClientProxy,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectModel(FlightBooking)
    private readonly flightBookingRepository: typeof FlightBooking,
  ) {}

  async createFlightOrder(flightOrder: CreateFlightOrderDto): Promise<unknown> {
    // TODO: “Remember to create a transaction and complete the checkout process.
    // TODO: add paypal fees

    const {
      data: {
        flightOffers: [flightOfferPrice],
      },
    } = await this.flightsServiceClient
      .send(FlightsServiceEvents.GET_FLIGHT_PRICE, [flightOrder.flightOffer])
      .toPromise();

    const orderId = await this.paymentsServiceClient
      .send(
        PaymentsServiceEvents.CREATE_ORDER,
        parseFloat(flightOfferPrice.price.total),
      )
      .toPromise();

    await this.cacheManager.set(
      orderId,
      JSON.stringify({
        flightOffer: flightOfferPrice,
        travelers: flightOrder.travelers,
      } as CreateFlightOrderDto),
    );

    return orderId;
  }

  async confirmFlightOrder(orderId: string) {
    const flightOrder = await this.cacheManager
      .get(orderId)
      .then((data: string | null) => JSON.parse(data));
    if (!isDefined(flightOrder)) throw new BadRequestException();

    const authorizationId = await this.paymentsServiceClient
      .send(PaymentsServiceEvents.CHECK_AUTHORIZATION, orderId)
      .toPromise();

    try {
      const {
        data: { id: flightOrderId },
      } = await this.externalApiIntegrationServiceClient
        .send(
          ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER,
          flightOrder,
        )
        .toPromise();

      await this.flightBookingRepository.create({
        orderId: flightOrderId,
        paymentOrderId: orderId,
      });

      await this.paymentsServiceClient
        .send(PaymentsServiceEvents.CAPTURE_PAYMENT, authorizationId)
        .toPromise();
    } catch (e) {
      await this.paymentsServiceClient
        .send(PaymentsServiceEvents.VOID_AUTHORIZATION, authorizationId)
        .toPromise();

      throw e;
    }

    return { status: 'success' };
  }
}
