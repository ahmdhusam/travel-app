import { Body, Controller, Param, Post } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('flights/orders')
  createFlightOrder(
    @Body() flightOrder: CreateFlightOrderDto,
  ): Observable<unknown> {
    return this.bookingService.createFlightOrder(flightOrder);
  }

  @Post('flights/orders/:orderId/confirm')
  confirmFlightOrder(@Param('orderId') orderId: string): Observable<unknown> {
    return this.bookingService.confirmFlightOrder(orderId);
  }
}
