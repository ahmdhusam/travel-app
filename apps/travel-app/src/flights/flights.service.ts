import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-providers.enum';
import { AmadeusFlightOffersRequestDto } from 'apps/external-api-integration/src/services/dto/amadeus-request.dto';
import { FlightsEvents } from 'apps/flights/src/enums/flights-events.enum';

@Injectable()
export class FlightsService {
  constructor(
    @Inject(FlightsProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsServiceClient: ClientProxy,
  ) {}

  searchFlights(criteria: AmadeusFlightOffersRequestDto) {
    return this.flightsServiceClient
      .send(FlightsEvents.GET_FLIGHT_OFFERS, criteria)
      .toPromise()
      .catch((err) => {
        throw new BadRequestException(err);
      });
  }
}
