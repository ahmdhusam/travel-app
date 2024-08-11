import { Injectable } from '@nestjs/common';
import { PaypalService } from './services/paypal.service';
import { Observable } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(private readonly paypalService: PaypalService) {}

  createOrder(amount: number): Observable<string> {
    return this.paypalService.createOrder(amount);
  }

  checkAuthorization(orderId: string): Observable<string> {
    return this.paypalService.checkAuthorization(orderId);
  }

  getOrderDetails(orderId: string): Observable<unknown> {
    return this.paypalService.getOrderDetails(orderId);
  }

  getAuthorizedPaymentDetails(authorizationId: string): Observable<unknown> {
    return this.paypalService.getAuthorizedPaymentDetails(authorizationId);
  }

  voidAuthorization(authorizationId: string): Observable<void> {
    return this.paypalService.voidAuthorization(authorizationId);
  }

  capturePayment(authorizationId: string): Observable<string> {
    return this.paypalService.capturePayment(authorizationId);
  }
}
