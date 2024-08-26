import { Inject, Injectable } from '@nestjs/common';
import { IFlightOffersService } from './interfaces/flight-offers-service.interface';
import { ExternalApiIntegrationServiceProviders } from './enums/external-api-integration-service-providers.enum';
import {
  FlightOfferDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ExternalApiIntegrationService {
  constructor(
    @Inject(ExternalApiIntegrationServiceProviders.AMADEUS_SERVICE)
    private readonly flightOffersService: IFlightOffersService,
  ) {}

  getFlightOffers(criteria: GetFlightOffersDto): Observable<unknown> {
    return this.flightOffersService.getFlightOffers(criteria);
  }

  getFlightPrice(flightOffers: FlightOfferDto[]): Observable<unknown> {
    return this.flightOffersService.getFlightPrice(flightOffers);
  }
}
