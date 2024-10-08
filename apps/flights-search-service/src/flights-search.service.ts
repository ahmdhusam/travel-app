import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlightsSearchServiceProviders } from './enums/flights-search-service-providers.enum';
import {
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import { Observable } from 'rxjs';

@Injectable()
export class FlightsSearchService {
  constructor(
    @Inject(
      FlightsSearchServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT,
    )
    private readonly externalApiIntegrationServiceClient: ClientProxy,
  ) {}

  getFlightOffers(
    criteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.externalApiIntegrationServiceClient.send(
      ExternalApiIntegrationServiceEvents.GET_FLIGHT_OFFERS,
      criteria,
    );
  }

  getFlightPrice(
    flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.externalApiIntegrationServiceClient.send(
      ExternalApiIntegrationServiceEvents.GET_FLIGHT_PRICE,
      flightOfferPriceDto,
    );
  }
}
