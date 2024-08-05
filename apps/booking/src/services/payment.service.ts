import { Inject, Injectable } from '@nestjs/common';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentsServiceEvents } from '@app/core/enums/payments-service.events.enum';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(BookingServiceProviders.PAYMENTS_SERVICE_CLIENT)
    private readonly paymentsServiceClient: ClientProxy,
  ) {}

  createOrder(amount: string): Observable<string> {
    return this.paymentsServiceClient.send(
      PaymentsServiceEvents.CREATE_ORDER,
      parseFloat(amount),
    );
  }

  checkAuthorization(paymentOrderId: string): Observable<string> {
    return this.paymentsServiceClient.send(
      PaymentsServiceEvents.CHECK_AUTHORIZATION,
      paymentOrderId,
    );
  }

  voidPayment(authorizationId: string): Observable<void> {
    return this.paymentsServiceClient.send(
      PaymentsServiceEvents.VOID_AUTHORIZATION,
      authorizationId,
    );
  }

  capturePayment(authorizationId: string): Observable<void> {
    return this.paymentsServiceClient.send(
      PaymentsServiceEvents.CAPTURE_PAYMENT,
      authorizationId,
    );
  }
}
