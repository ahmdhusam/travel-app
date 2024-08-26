import { Controller } from '@nestjs/common';
import { BookingService } from './booking.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingServiceEvents } from '@app/core/enums/booking-service-events.enum';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { Observable, from, map } from 'rxjs';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseSerialize(PaymentOrderSerialize)
  @MessagePattern(BookingServiceEvents.CREATE_FLIGHT_ORDER)
  createFlightOrder(
    @Payload() flightOrderDto: CreateFlightOrderDto,
  ): Observable<PaymentOrderSerialize> {
    return from(this.bookingService.createFlightOrder(flightOrderDto));
  }

  @MessagePattern(BookingServiceEvents.CONFIRM_FLIGHT_ORDER)
  confirmFlightOrder(@Payload() orderId: string): Observable<void> {
    return from(this.bookingService.confirmFlightOrder(orderId)).pipe(
      map(() => null),
    );
  }
}
