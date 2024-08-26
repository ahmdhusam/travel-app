import { Inject, Injectable } from '@nestjs/common';
import { BookingProviders } from './enums/booking-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';
import { BookingServiceEvents } from '@app/core/enums/booking-service-events.enum';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BookingProviders.BOOKING_SERVICE_CLIENT)
    private readonly bookingServiceClient: ClientProxy,
  ) {}

  createFlightOrder(
    flightOrderDto: CreateFlightOrderDto,
  ): Observable<PaymentOrderSerialize> {
    return this.bookingServiceClient.send(
      BookingServiceEvents.CREATE_FLIGHT_ORDER,
      flightOrderDto,
    );
  }

  confirmFlightOrder(orderId: string): Observable<void> {
    return this.bookingServiceClient.send(
      BookingServiceEvents.CONFIRM_FLIGHT_ORDER,
      orderId,
    );
  }
}
