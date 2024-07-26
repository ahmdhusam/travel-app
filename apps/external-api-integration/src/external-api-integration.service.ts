import { Inject, Injectable } from '@nestjs/common';
import { IFlightOffersService } from './interfaces/flight-offers-service.interface';
import { ExternalApiIntegrationServiceProviders } from './enums/external-api-integration-service-providers.enum';
import { GetFlightOffersDto } from 'apps/shared/dtos/amadeus-data-model.dto';

@Injectable()
export class ExternalApiIntegrationService {
  constructor(
    @Inject(ExternalApiIntegrationServiceProviders.AMADEUS_SERVICE)
    private readonly flightOffersService: IFlightOffersService,
  ) {}

  getFlightOffers(criteria: GetFlightOffersDto) {
    return this.flightOffersService.getFlightOffers(criteria);
  }
}
