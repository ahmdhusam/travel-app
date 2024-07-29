import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async createOrder(amount: number) {
    throw new NotImplementedException();
  }

  async checkAuthorization(orderId: string) {
    throw new NotImplementedException();
  }

  async getOrderDetails(orderId: string) {
    throw new NotImplementedException();
  }

  async getAuthorizedPaymentDetails(authorizationId: string) {
    throw new NotImplementedException();
  }

  async voidAuthorization(authorizationId: string) {
    throw new NotImplementedException();
  }

  async capturePayment(authorizationId: string) {
    throw new NotImplementedException();
  }
}
