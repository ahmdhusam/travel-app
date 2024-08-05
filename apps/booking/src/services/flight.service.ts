import { FlightsServiceEvents } from '@app/core/enums/flights-service-events.enum';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFlightOrderDto,
  FlightOfferDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';

@Injectable()
export class FlightService {
  constructor(
    @Inject(BookingServiceProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsServiceClient: ClientProxy,
  ) {}

  getFlightPrice(flightOffer: FlightOfferDto): Observable<FlightOfferDto> {
    return this.flightsServiceClient
      .send(FlightsServiceEvents.GET_FLIGHT_PRICE, [flightOffer])
      .pipe(map((res) => res.data.flightOffers[0]));
  }

  createFlightOrder(
    flightOfferDetails: CreateFlightOrderDto,
  ): Observable<{ id: string }> {
    return this.flightsServiceClient
      .send(FlightsServiceEvents.CREATE_FLIGHT_ORDER, flightOfferDetails)
      .pipe(map((flightOfferId) => ({ id: flightOfferId })));
  }
}
