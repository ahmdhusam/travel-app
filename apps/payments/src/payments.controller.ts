import { Controller, ParseIntPipe } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentsServiceEvents } from '@app/core/enums/payments-service.events.enum';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern(PaymentsServiceEvents.CREATE_ORDER)
  async createOrder(@Payload(ParseIntPipe) amount: number) {
    return this.paymentsService.createOrder(amount);
  }

  @MessagePattern(PaymentsServiceEvents.CHECK_AUTHORIZATION)
  async checkAuthorization(@Payload() orderId: string) {
    return this.paymentsService.checkAuthorization(orderId);
  }

  @MessagePattern(PaymentsServiceEvents.GET_ORDER_DATA)
  async getOrderData(@Payload() orderId: string) {
    return this.paymentsService.getOrderDetails(orderId);
  }

  @MessagePattern(PaymentsServiceEvents.GET_AUTHORIZE_PAYMENT)
  async getAuthorizePayment(@Payload() authorizationId: string) {
    return this.paymentsService.getAuthorizedPaymentDetails(authorizationId);
  }

  @MessagePattern(PaymentsServiceEvents.VOID_AUTHORIZATION)
  async voidAuthorization(@Payload() authorizationId: string) {
    return this.paymentsService.voidAuthorization(authorizationId);
  }

  @MessagePattern(PaymentsServiceEvents.CAPTURE_PAYMENT)
  async capturePayment(@Payload() authorizationId: string) {
    return this.paymentsService.capturePayment(authorizationId);
  }
}
