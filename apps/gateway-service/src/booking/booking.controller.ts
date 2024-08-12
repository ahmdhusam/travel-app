import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { Observable } from 'rxjs';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { ApiNoContentResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOkResponse({ description: 'Order created', type: PaymentOrderSerialize })
  @UseSerialize(PaymentOrderSerialize)
  @HttpCode(HttpStatus.OK)
  @Post('flights/orders')
  createFlightOrder(
    @Body() flightOrderDto: CreateFlightOrderDto,
  ): Observable<PaymentOrderSerialize> {
    if (
      flightOrderDto.flightOffer.travelerPricings.length !==
      flightOrderDto.travelers.length
    )
      throw new BadRequestException('travelerPricings and travelers mismatch');

    return this.bookingService.createFlightOrder(flightOrderDto);
  }

  @ApiNoContentResponse({ description: 'Flight order confirmed' })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('flights/orders/:orderId/confirm')
  confirmFlightOrder(@Param('orderId') orderId: string): Observable<void> {
    return this.bookingService.confirmFlightOrder(orderId);
  }
}
