import { Controller } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import {
  CreateFlightOrderDto,
  FlightOfferDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

@Controller()
export class ExternalApiIntegrationController {
  constructor(
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  @MessagePattern(ExternalApiIntegrationServiceEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(@Payload() data: GetFlightOffersDto): Observable<unknown> {
    return this.externalApiIntegrationService.getFlightOffers(data);
  }

  @MessagePattern(ExternalApiIntegrationServiceEvents.GET_FLIGHT_PRICE)
  getFlightPrice(@Payload() data: FlightOfferDto[]): Observable<unknown> {
    return this.externalApiIntegrationService.getFlightPrice(data);
  }

  @MessagePattern(ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER)
  createFlightOrder(@Payload() flightOrder: CreateFlightOrderDto): Observable<unknown> {
    return this.externalApiIntegrationService.createFlightOrder(flightOrder);
  }
}
