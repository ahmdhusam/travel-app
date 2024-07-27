import { Inject, Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { map, Observable, tap } from 'rxjs';
import { BookingServiceProviders } from './enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import { InjectModel } from '@nestjs/sequelize';
import { FlightBooking } from './models/booking.model';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BookingServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT)
    private readonly ExternalApiIntegrationServiceClient: ClientProxy,
    @InjectModel(FlightBooking)
    private readonly flightBookingRepository: typeof FlightBooking,
  ) {}

  createFlightOrder(flightOrder: CreateFlightOrderDto): Observable<unknown> {
    // TODO: “Remember to create a transaction and complete the checkout process.
    return this.ExternalApiIntegrationServiceClient.send(
      ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER,
      flightOrder,
    ).pipe(
      map((res) => res.data.id),
      tap((orderId) => this.flightBookingRepository.create({ orderId })),
    );
  }
}
