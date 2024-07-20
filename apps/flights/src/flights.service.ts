import { Inject, Injectable } from '@nestjs/common';
import { FlightsProviders } from './enums/flights-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { ExternalApiIntegrationEvents } from 'apps/external-api-integration/src/enums/external-api-integration-events.enum';
import { AmadeusFlightOffersRequestDto } from 'apps/external-api-integration/src/services/dto/amadeus-request.dto';

@Injectable()
export class FlightsService {
  constructor(
    @Inject(FlightsProviders.ExternalApiIntegrationClient)
    private readonly ExternalApiIntegrationClient: ClientProxy,
  ) {}

  getFlightOffers(criteria: AmadeusFlightOffersRequestDto) {
    return this.ExternalApiIntegrationClient.send(
      ExternalApiIntegrationEvents.GET_FLIGHT_OFFERS,
      criteria,
    ).toPromise();
  }
}
