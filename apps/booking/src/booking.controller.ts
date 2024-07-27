import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { EventPattern } from '@nestjs/microservices';
import { BookingServiceEvents } from '@app/core/enums/booking-service-events.enum';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @EventPattern(BookingServiceEvents.CREATE_FLIGHT_ORDER)
  createFlightOrder(flightOrder: CreateFlightOrderDto): Observable<unknown> {
    return this.bookingService.createFlightOrder(flightOrder);
  }
}
