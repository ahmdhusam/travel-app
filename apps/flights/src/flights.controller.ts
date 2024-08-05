import { Controller, UseInterceptors } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightSearchCachingInterceptor } from './flight-search-caching.interceptor';
import { FlightsServiceEvents } from '@app/core/enums/flights-service-events.enum';
import {
  CreateFlightOrderDto,
  FlightOfferDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsServiceEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(@Payload() data: GetFlightOffersDto): Observable<unknown> {
    return this.flightsService.getFlightOffers(data);
  }

  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsServiceEvents.GET_FLIGHT_PRICE)
  getFlightPrice(@Payload() data: FlightOfferDto[]): Observable<unknown> {
    return this.flightsService.getFlightPrice(data);
  }

  @MessagePattern(FlightsServiceEvents.CREATE_FLIGHT_ORDER)
  createFlightOrder(
    @Payload() flightOfferDetails: CreateFlightOrderDto,
  ): Observable<string> {
    return this.flightsService.createFlightOrder(flightOfferDetails);
  }
}
