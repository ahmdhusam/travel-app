import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FlightsSearchService } from './flights-search.service';
import {
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsSearchService: FlightsSearchService) {}

  @HttpCode(HttpStatus.OK)
  @Post('search')
  searchFlights(@Body() criteria: GetFlightOffersDto): Observable<unknown> {
    return this.flightsSearchService.searchFlights(criteria);
  }

  @HttpCode(HttpStatus.OK)
  @Post('pricing')
  getFlightPrice(
    @Body() flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<unknown> {
    return this.flightsSearchService.getFlightPrice(
      flightOfferPriceDto.flightOffers,
    );
  }
}
