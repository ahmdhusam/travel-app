import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-search-providers.enum';
import { FlightsSearchServiceEvents } from '@app/core/enums/flights-search-service-events.enum';
import {
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Injectable()
export class FlightsSearchService {
  constructor(
    @Inject(FlightsProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsSearchServiceClient: ClientProxy,
  ) {}

  searchFlights(
    criteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.flightsSearchServiceClient.send(
      FlightsSearchServiceEvents.GET_FLIGHT_OFFERS,
      criteria,
    );
  }

  getFlightPrice(
    flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.flightsSearchServiceClient.send(
      FlightsSearchServiceEvents.GET_FLIGHT_PRICE,
      flightOfferPriceDto,
    );
  }
}
