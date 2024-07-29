import { Inject, Injectable } from '@nestjs/common';
import { BookingProviders } from './enums/booking-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';
import { BookingServiceEvents } from '@app/core/enums/booking-service-events.enum';

@Injectable()
export class BookingService {
  constructor(
    @Inject(BookingProviders.BOOKING_SERVICE_CLIENT)
    private readonly flightsServiceClient: ClientProxy,
  ) {}

  createFlightOrder(flightOrder: CreateFlightOrderDto): Observable<unknown> {
    return this.flightsServiceClient.send(
      BookingServiceEvents.CREATE_FLIGHT_ORDER,
      flightOrder,
    );
  }

  confirmFlightOrder(orderId: string): Observable<unknown> {
    return this.flightsServiceClient.send(
      BookingServiceEvents.CONFIRM_FLIGHT_ORDER,
      orderId,
    );
  }
}
