import { Inject, Injectable } from '@nestjs/common';
import { IFlightOffersService } from './interfaces/flight-offers-service.interface';
import { AmadeusFlightOffersRequestDto } from './services/dto/amadeus-request.dto';
import { ExternalApiIntegrationProviders } from './enums/external-api-integration-providers.enum';

@Injectable()
export class ExternalApiIntegrationService {
  constructor(
    @Inject(ExternalApiIntegrationProviders.AMADEUS_SERVICE)
    private readonly flightOffersService: IFlightOffersService,
  ) {}

  getFlightOffers(criteria: AmadeusFlightOffersRequestDto) {
    return this.flightOffersService.getFlightOffers(criteria);
  }
}
