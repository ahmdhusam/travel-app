import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { PaymentService } from './payment.service';
import { Injectable } from '@nestjs/common';
import { FlightBooking } from '../models/booking.model';
import { InjectModel } from '@nestjs/sequelize';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { PaymentAuthorizationSerialize } from 'apps/shared/dtos/payment-authorization.serialize';

@Injectable()
export class OrderService {
  constructor(
    private readonly paymentService: PaymentService,
    @InjectModel(FlightBooking)
    private readonly flightBookingRepository: typeof FlightBooking,
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  createOrder(totalPrice: string): Promise<PaymentOrderSerialize> {
    return this.paymentService.createOrder(totalPrice);
  }

  private checkAuthorization(
    paymentOrderId: string,
  ): Promise<PaymentAuthorizationSerialize> {
    return this.paymentService.checkAuthorization(paymentOrderId);
  }

  async finalizeOrderAndSave(
    paymentOrderId: string,
    flightOrderDto: CreateFlightOrderDto,
  ): Promise<void> {
    const authorization = await this.checkAuthorization(paymentOrderId);

    try {
      const flightOrder =
        await this.externalApiIntegrationService.createFlightOrder(
          flightOrderDto,
        );

      await this.flightBookingRepository.create({
        flightOrderId: flightOrder.id,
        paymentOrderId: paymentOrderId,
      });

      await this.paymentService.capturePayment(authorization.id);
    } catch (e) {
      await this.paymentService.voidPayment(authorization.id);

      throw e;
    }
  }
}
