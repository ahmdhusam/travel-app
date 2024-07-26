import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-providers.enum';
import { FlightsServiceEvents } from '@app/core/enums/flights-service-events.enum';
import { GetFlightOffersDto } from 'apps/shared/dtos/amadeus-data-model.dto';

@Injectable()
export class FlightsService {
  constructor(
    @Inject(FlightsProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsServiceClient: ClientProxy,
  ) {}

  searchFlights(criteria: GetFlightOffersDto) {
    return this.flightsServiceClient.send(
      FlightsServiceEvents.GET_FLIGHT_OFFERS,
      criteria,
    );
  }
}
