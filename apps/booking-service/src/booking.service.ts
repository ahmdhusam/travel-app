import { Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
// import { CacheService } from './services/cache.service';
import { OrderService } from './services/order.service';
import { FlightsSearchService } from './services/flights-search.service';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { TransactionService } from './services/transaction.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly flightsSearchService: FlightsSearchService,
    private readonly orderService: OrderService,
    // private readonly cacheService: CacheService,
    private readonly transactionService: TransactionService,
  ) {}

  async createFlightOrder({
    flightOffer,
    travelers,
  }: CreateFlightOrderDto): Promise<PaymentOrderSerialize> {
    // TODO: “Remember to create a transaction and complete the checkout process.
    // TODO: add paypal fees

    const { flightOffer: flightOfferPrice } =
      await this.flightsSearchService.getFlightPrice({
        flightOffer,
      });

    const paymentOrder = await this.orderService.createOrder(
      flightOfferPrice.price.total,
    );

    // await this.cacheService.setFlightOfferDetails(paymentOrder.id, {
    //   flightOffer: flightOfferPrice,
    //   travelers,
    // });

    await this.transactionService.createTransaction(paymentOrder.id, {
      flightOffer: flightOfferPrice,
      travelers,
    });

    return paymentOrder;
  }

  async confirmFlightOrder(paymentOrderId: string): Promise<void> {
    // const flightOfferDetails =
    //   await this.cacheService.getFlightOfferDetailsOrThrow(paymentOrderId);

    const transaction =
      await this.transactionService.getTransactionByPaymentOrderId(
        paymentOrderId,
      );

    return this.orderService.finalizeOrderAndSave(
      paymentOrderId,
      transaction.details,
      transaction.id,
    );
  }
}
