import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { PaymentService } from './payment.service';
import { Injectable } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightBooking } from '../models/booking.model';
import { InjectModel } from '@nestjs/sequelize';
import {
  catchError,
  concatMap,
  from,
  map,
  Observable,
  switchMap,
  throwError,
} from 'rxjs';

@Injectable()
export class OrderService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly flightService: FlightService,
    @InjectModel(FlightBooking)
    private readonly flightBookingRepository: typeof FlightBooking,
  ) {}

  createOrder(totalPrice: string): Observable<{ id: string }> {
    return this.paymentService
      .createOrder(totalPrice)
      .pipe(map((orderId) => ({ id: orderId })));
  }

  checkAuthorization(paymentOrderId: string): Observable<{ id: string }> {
    return this.paymentService
      .checkAuthorization(paymentOrderId)
      .pipe(map((authorizationId) => ({ id: authorizationId })));
  }

  finalizeOrderAndSave(
    paymentOrderId: string,
    authorizationId: string,
    flightOfferDetails: CreateFlightOrderDto,
  ): Observable<void> {
    return this.flightService.createFlightOrder(flightOfferDetails).pipe(
      concatMap((flightOrder) =>
        from(
          this.flightBookingRepository.create({
            flightOrderId: flightOrder.id,
            paymentOrderId: paymentOrderId,
          }),
        ).pipe(
          concatMap(() => this.paymentService.capturePayment(authorizationId)),
        ),
      ),
      catchError((err) =>
        this.paymentService
          .voidPayment(authorizationId)
          .pipe(switchMap(() => throwError(() => err))),
      ),
    );
  }
}
