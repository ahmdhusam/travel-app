import { Controller, UseInterceptors } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { FlightSearchCachingInterceptor } from './flight-search-caching.interceptor';
import { FlightsServiceEvents } from '@app/core/enums/flights-service-events.enum';
import { GetFlightOffersDto } from 'apps/shared/dtos/amadeus-data-model.dto';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @UseInterceptors(FlightSearchCachingInterceptor)
  @MessagePattern(FlightsServiceEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(@Payload() data: GetFlightOffersDto) {
    return this.flightsService.getFlightOffers(data);
  }
}
