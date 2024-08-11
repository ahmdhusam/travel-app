import { Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { CacheService } from './services/cache.service';
import { OrderService } from './services/order.service';
import { FlightsSearchService } from './services/flights-search.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly flightService: FlightsSearchService,
    private readonly orderService: OrderService,
    private readonly cacheService: CacheService,
  ) {}

  async createFlightOrder(flightOrder: CreateFlightOrderDto): Promise<unknown> {
    // TODO: “Remember to create a transaction and complete the checkout process.
    // TODO: add paypal fees

    const flightOfferPrice = await this.flightService.getFlightPrice(
      flightOrder.flightOffer,
    );

    const paymentOrder = await this.orderService.createOrder(
      flightOfferPrice.price.total,
    );

    await this.cacheService.setFlightOfferDetails(paymentOrder.id, {
      flightOffer: flightOfferPrice,
      travelers: flightOrder.travelers,
    });

    return paymentOrder;
  }

  async confirmFlightOrder(paymentOrderId: string) {
    const flightOfferDetails =
      await this.cacheService.getFlightOfferDetailsOrThrow(paymentOrderId);

    const authorization =
      await this.orderService.checkAuthorization(paymentOrderId);

    return this.orderService.finalizeOrderAndSave(
      paymentOrderId,
      authorization.id,
      flightOfferDetails,
    );
  }
}
