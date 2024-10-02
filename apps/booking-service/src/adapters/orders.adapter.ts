import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { PaymentAdapter } from './payment.adapter';
import { Injectable } from '@nestjs/common';
import { FlightBooking } from '../models/booking.model';
import { InjectModel } from '@nestjs/sequelize';
import { ExternalApiIntegrationAdapter } from './external-api-integration.adapter';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { PaymentAuthorizationSerialize } from 'apps/shared/dtos/payment-authorization.serialize';

@Injectable()
export class OrdersAdapter {
  constructor(
    private readonly paymentAdapter: PaymentAdapter,
    @InjectModel(FlightBooking)
    private readonly flightBookingRepository: typeof FlightBooking,
    private readonly externalApiIntegrationAdapter: ExternalApiIntegrationAdapter,
  ) {}

  createOrder(totalPrice: string): Promise<PaymentOrderSerialize> {
    return this.paymentAdapter.createOrder(totalPrice);
  }

  private checkAuthorization(
    paymentOrderId: string,
  ): Promise<PaymentAuthorizationSerialize> {
    return this.paymentAdapter.checkAuthorization(paymentOrderId);
  }

  async finalizeOrderAndSave(
    paymentOrderId: string,
    flightOrderDto: CreateFlightOrderDto,
    transactionId: number,
  ): Promise<void> {
    const authorization = await this.checkAuthorization(paymentOrderId);

    try {
      const flightOrder =
        await this.externalApiIntegrationAdapter.createFlightOrder(
          flightOrderDto,
        );

      await this.flightBookingRepository.create({
        flightOrderId: flightOrder.id,
        transactionId,
      });

      await this.paymentAdapter.capturePayment(authorization.id);
    } catch (e) {
      await this.paymentAdapter.voidPayment(authorization.id);

      throw e;
    }
  }
}
