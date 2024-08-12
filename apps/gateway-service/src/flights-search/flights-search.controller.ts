import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { FlightsSearchService } from './flights-search.service';
import {
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsSearchService: FlightsSearchService) {}

  @ApiOkResponse({ description: 'Flights found', type: FlightOffersSerialize })
  @UseSerialize(FlightOffersSerialize)
  @HttpCode(HttpStatus.OK)
  @Post('search')
  searchFlights(
    @Body() criteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.flightsSearchService.searchFlights(criteria);
  }

  @ApiOkResponse({
    description: 'Flight price',
    type: FlightOfferPriceSerialize,
  })
  @UseSerialize(FlightOfferPriceSerialize)
  @HttpCode(HttpStatus.OK)
  @Post('pricing')
  getFlightPrice(
    @Body() flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.flightsSearchService.getFlightPrice(flightOfferPriceDto);
  }
}
