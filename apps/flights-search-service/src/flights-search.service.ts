import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FlightsSearchServiceProviders } from './enums/flights-search-service-providers.enum';
import {
  CreateFlightOrderDto,
  FlightOfferDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import { map, Observable } from 'rxjs';

@Injectable()
export class FlightsSearchService {
  constructor(
    @Inject(
      FlightsSearchServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT,
    )
    private readonly externalApiIntegrationServiceClient: ClientProxy,
  ) {}

  getFlightOffers(criteria: GetFlightOffersDto): Observable<unknown> {
    return this.externalApiIntegrationServiceClient.send(
      ExternalApiIntegrationServiceEvents.GET_FLIGHT_OFFERS,
      criteria,
    );
  }

  getFlightPrice(flightOffers: FlightOfferDto[]): Observable<unknown> {
    return this.externalApiIntegrationServiceClient.send(
      ExternalApiIntegrationServiceEvents.GET_FLIGHT_PRICE,
      flightOffers,
    );
  }

  createFlightOrder(
    flightOfferDetails: CreateFlightOrderDto,
  ): Observable<string> {
    return this.externalApiIntegrationServiceClient
      .send(
        ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER,
        flightOfferDetails,
      )
      .pipe(map((flightOrder) => flightOrder.data.id));
  }
}
