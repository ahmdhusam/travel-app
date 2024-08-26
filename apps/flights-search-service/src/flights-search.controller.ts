import { Controller, UseInterceptors } from '@nestjs/common';
import { FlightsSearchService } from './flights-search.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightSearchCachingInterceptor } from './flight-search-caching.interceptor';
import { FlightsSearchServiceEvents } from '@app/core/enums/flights-search-service-events.enum';
import {
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';

@Controller()
export class FlightsController {
  constructor(private readonly flightsSearchService: FlightsSearchService) {}

  @UseSerialize(FlightOffersSerialize)
  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsSearchServiceEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(
    @Payload() criteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.flightsSearchService.getFlightOffers(criteria);
  }

  @UseSerialize(FlightOfferPriceSerialize)
  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsSearchServiceEvents.GET_FLIGHT_PRICE)
  getFlightPrice(
    @Payload() flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.flightsSearchService.getFlightPrice(flightOfferPriceDto);
  }
}
