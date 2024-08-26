import { FlightsSearchServiceEvents } from '@app/core/enums/flights-search-service-events.enum';
import { Inject, Injectable } from '@nestjs/common';
import {
  FlightOfferPriceSerialize,
  GetFlightOfferPriceDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FlightsSearchService {
  constructor(
    @Inject(BookingServiceProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsSearchServiceClient: ClientProxy,
  ) {}

  getFlightPrice(
    flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Promise<FlightOfferPriceSerialize> {
    return this.flightsSearchServiceClient
      .send(FlightsSearchServiceEvents.GET_FLIGHT_PRICE, flightOfferPriceDto)
      .toPromise();
  }
}
