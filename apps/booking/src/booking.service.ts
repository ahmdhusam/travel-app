import { Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { CacheService } from './services/cache.service';
import { OrderService } from './services/order.service';
import { FlightService } from './services/flight.service';
import { map, Observable, switchMap } from 'rxjs';

@Injectable()
export class BookingService {
  constructor(
    private readonly flightService: FlightService,
    private readonly orderService: OrderService,
    private readonly cacheService: CacheService,
  ) {}

  createFlightOrder(
    flightOrder: CreateFlightOrderDto,
  ): Observable<{ id: string }> {
    // TODO: “Remember to create a transaction and complete the checkout process.

    return this.flightService.getFlightPrice(flightOrder.flightOffer).pipe(
      switchMap((flightOfferPrice) =>
        this.orderService.createOrder(flightOfferPrice.price.total).pipe(
          switchMap((paymentOrder) =>
            this.cacheService
              .setFlightOfferDetails(paymentOrder.id, {
                flightOffer: flightOfferPrice,
                travelers: flightOrder.travelers,
              })
              .pipe(map(() => paymentOrder)),
          ),
        ),
      ),
    );
  }

  confirmFlightOrder(paymentOrderId: string): Observable<{ status: string }> {
    return this.cacheService
      .getFlightOfferDetailsOrThrow(paymentOrderId)
      .pipe(
        switchMap((flightOfferDetails) =>
          this.orderService
            .checkAuthorization(paymentOrderId)
            .pipe(
              switchMap((authorization) =>
                this.orderService
                  .finalizeOrderAndSave(
                    paymentOrderId,
                    authorization.id,
                    flightOfferDetails,
                  )
                  .pipe(map((_) => ({ status: 'success' }))),
              ),
            ),
        ),
      );
  }
}
