import { Controller } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import {
  CreateFlightOrderDto,
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  FlightOrderSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';

@Controller()
export class ExternalApiIntegrationController {
  constructor(
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  @UseSerialize(FlightOffersSerialize)
  @MessagePattern(ExternalApiIntegrationServiceEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(
    @Payload() criteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.externalApiIntegrationService.getFlightOffers(criteria);
  }

  @UseSerialize(FlightOfferPriceSerialize)
  @MessagePattern(ExternalApiIntegrationServiceEvents.GET_FLIGHT_PRICE)
  getFlightPrice(
    @Payload() flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.externalApiIntegrationService.getFlightPrice(
      flightOfferPriceDto,
    );
  }

  @UseSerialize(FlightOrderSerialize)
  @MessagePattern(ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER)
  createFlightOrder(
    @Payload() flightOrderDto: CreateFlightOrderDto,
  ): Observable<FlightOrderSerialize> {
    return this.externalApiIntegrationService.createFlightOrder(flightOrderDto);
  }
}
