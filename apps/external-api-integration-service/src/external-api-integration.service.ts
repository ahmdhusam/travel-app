import { Inject, Injectable } from '@nestjs/common';
import { IFlightOffersService } from './interfaces/flight-offers-service.interface';
import { ExternalApiIntegrationServiceProviders } from './enums/external-api-integration-service-providers.enum';
import {
  CreateFlightOrderDto,
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  FlightOrderSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Injectable()
export class ExternalApiIntegrationService {
  constructor(
    @Inject(ExternalApiIntegrationServiceProviders.AMADEUS_SERVICE)
    private readonly flightOffersService: IFlightOffersService,
  ) {}

  getFlightOffers(
    criteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.flightOffersService.getFlightOffers(criteria);
  }

  getFlightPrice(
    flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.flightOffersService.getFlightPrice(flightOfferPriceDto);
  }

  createFlightOrder(
    flightOrderDto: CreateFlightOrderDto,
  ): Observable<FlightOrderSerialize> {
    return this.flightOffersService.createFlightOrder(flightOrderDto);
  }
}
