import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingServiceEvents } from '@app/core/enums/booking-service-events.enum';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern(BookingServiceEvents.CREATE_FLIGHT_ORDER)
  createFlightOrder(
    @Payload() flightOrder: CreateFlightOrderDto,
  ): Observable<{ id: string }> {
    return this.bookingService.createFlightOrder(flightOrder);
  }

  @MessagePattern(BookingServiceEvents.CONFIRM_FLIGHT_ORDER)
  confirmFlightOrder(
    @Payload() orderId: string,
  ): Observable<{ status: string }> {
    return this.bookingService.confirmFlightOrder(orderId);
  }
}
