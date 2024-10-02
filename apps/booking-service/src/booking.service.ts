import { Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { OrdersAdapter } from './adapters/orders.adapter';
import { FlightsSearchAdapter } from './adapters/flights-search.adapter';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { TransactionAdapter } from './adapters/transaction.adapter';

@Injectable()
export class BookingService {
  constructor(
    private readonly flightsSearchAdapter: FlightsSearchAdapter,
    private readonly ordersAdapter: OrdersAdapter,
    private readonly transactionsAdapter: TransactionAdapter,
  ) {}

  async createFlightOrder({
    flightOffer,
    travelers,
  }: CreateFlightOrderDto): Promise<PaymentOrderSerialize> {
    // TODO: “Remember to create a transaction and complete the checkout process.
    // TODO: add paypal fees

    const { flightOffer: flightOfferPrice } =
      await this.flightsSearchAdapter.getFlightPrice({
        flightOffer,
      });

    const paymentOrder = await this.ordersAdapter.createOrder(
      flightOfferPrice.price.total,
    );

    await this.transactionsAdapter.createTransaction(paymentOrder.id, {
      flightOffer: flightOfferPrice,
      travelers,
    });

    return paymentOrder;
  }

  async confirmFlightOrder(paymentOrderId: string): Promise<void> {
    const transaction =
      await this.transactionsAdapter.getTransactionByPaymentOrderId(
        paymentOrderId,
      );

    return this.ordersAdapter.finalizeOrderAndSave(
      paymentOrderId,
      transaction.details,
      transaction.id,
    );
  }
}
