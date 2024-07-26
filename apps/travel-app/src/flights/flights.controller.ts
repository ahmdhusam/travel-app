import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { GetFlightOffersDto } from 'apps/shared/dtos/amadeus-data-model.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('search')
  searchFlights(@Body() criteria: GetFlightOffersDto) {
    return this.flightsService.searchFlights(criteria);
  }
}
