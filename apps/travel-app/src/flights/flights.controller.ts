import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';
import {
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @HttpCode(HttpStatus.OK)
  @Post('search')
  searchFlights(@Body() criteria: GetFlightOffersDto): Observable<unknown> {
    return this.flightsService.searchFlights(criteria);
  }

  @HttpCode(HttpStatus.OK)
  @Post('pricing')
  getFlightPrice(
    @Body() flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<unknown> {
    return this.flightsService.getFlightPrice(flightOfferPriceDto.flightOffers);
  }
}
