import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsServiceEvents } from '@app/core/enums/payments-service.events.enum';
import { Observable } from 'rxjs';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { PaymentAuthorizationSerialize } from 'apps/shared/dtos/payment-authorization.serialize';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @UseSerialize(PaymentOrderSerialize)
  @MessagePattern(PaymentsServiceEvents.CREATE_ORDER)
  createOrder(@Payload() amount: number): Observable<PaymentOrderSerialize> {
    return this.paymentsService.createOrder(amount);
  }

  @UseSerialize(PaymentAuthorizationSerialize)
  @MessagePattern(PaymentsServiceEvents.CHECK_AUTHORIZATION)
  checkAuthorization(
    @Payload() orderId: string,
  ): Observable<PaymentAuthorizationSerialize> {
    return this.paymentsService.checkAuthorization(orderId);
  }

  @MessagePattern(PaymentsServiceEvents.GET_ORDER_DATA)
  getOrderData(@Payload() orderId: string): Observable<unknown> {
    return this.paymentsService.getOrderDetails(orderId);
  }

  @MessagePattern(PaymentsServiceEvents.GET_AUTHORIZE_PAYMENT)
  getAuthorizePayment(@Payload() authorizationId: string): Observable<unknown> {
    return this.paymentsService.getAuthorizedPaymentDetails(authorizationId);
  }

  @MessagePattern(PaymentsServiceEvents.VOID_AUTHORIZATION)
  voidAuthorization(@Payload() authorizationId: string): Observable<void> {
    return this.paymentsService.voidAuthorization(authorizationId);
  }

  @MessagePattern(PaymentsServiceEvents.CAPTURE_PAYMENT)
  capturePayment(@Payload() authorizationId: string): Observable<void> {
    return this.paymentsService.capturePayment(authorizationId);
  }
}
