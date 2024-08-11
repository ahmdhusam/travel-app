import { Inject, Injectable } from '@nestjs/common';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsServiceEvents } from '@app/core/enums/payments-service.events.enum';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(BookingServiceProviders.PAYMENTS_SERVICE_CLIENT)
    private readonly paymentsServiceClient: ClientProxy,
  ) {}

  createOrder(amount: string): Promise<string> {
    return this.paymentsServiceClient
      .send(PaymentsServiceEvents.CREATE_ORDER, parseFloat(amount))
      .toPromise();
  }

  checkAuthorization(paymentOrderId: string): Promise<string> {
    return this.paymentsServiceClient
      .send(PaymentsServiceEvents.CHECK_AUTHORIZATION, paymentOrderId)
      .toPromise();
  }

  voidPayment(authorizationId: string): Promise<void> {
    return this.paymentsServiceClient
      .send(PaymentsServiceEvents.VOID_AUTHORIZATION, authorizationId)
      .toPromise();
  }

  capturePayment(authorizationId: string): Promise<void> {
    return this.paymentsServiceClient
      .send(PaymentsServiceEvents.CAPTURE_PAYMENT, authorizationId)
      .toPromise();
  }
}
