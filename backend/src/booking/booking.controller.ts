import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import {
  ApiCreatedResponse,
  ApiNotImplementedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags(BookingController.name.replace('Controller', ''))
@ApiNotImplementedResponse({ description: 'Not Implemented' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // TODO: set type.
  @ApiCreatedResponse({ type: null })
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  // TODO: set type.
  @ApiOkResponse({ type: null })
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  // TODO: set type.
  @ApiOkResponse({ type: null })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.findOne(id);
  }

  // TODO: set type.
  @ApiOkResponse({ type: null })
  @Post(':id/cancel')
  cancel(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.cancel(id);
  }
}
