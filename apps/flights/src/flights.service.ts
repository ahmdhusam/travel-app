import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlightsServiceProviders } from './enums/flights-service-providers.enum';
import { GetFlightOffersDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';

@Injectable()
export class FlightsService {
  constructor(
    @Inject(FlightsServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT)
    private readonly ExternalApiIntegrationServiceClient: ClientProxy,
  ) {}

  getFlightOffers(criteria: GetFlightOffersDto) {
    return this.ExternalApiIntegrationServiceClient.send(
      ExternalApiIntegrationServiceEvents.GET_FLIGHT_OFFERS,
      criteria,
    );
  }
}
