import { Controller, UseInterceptors } from '@nestjs/common';
import { FlightsSearchService } from './flights-search.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightSearchCachingInterceptor } from './flight-search-caching.interceptor';
import { FlightsSearchServiceEvents } from '@app/core/enums/flights-search-service-events.enum';
import {
  FlightOfferDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller()
export class FlightsController {
  constructor(private readonly flightsSearchService: FlightsSearchService) {}

  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsSearchServiceEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(@Payload() data: GetFlightOffersDto): Observable<unknown> {
    return this.flightsSearchService.getFlightOffers(data);
  }

  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsSearchServiceEvents.GET_FLIGHT_PRICE)
  getFlightPrice(@Payload() data: FlightOfferDto[]): Observable<unknown> {
    return this.flightsSearchService.getFlightPrice(data);
  }
}
