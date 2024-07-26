import { Controller } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import { GetFlightOffersDto } from 'apps/shared/dtos/amadeus-data-model.dto';

@Controller()
export class ExternalApiIntegrationController {
  constructor(
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  @MessagePattern(ExternalApiIntegrationServiceEvents.GET_FLIGHT_OFFERS)
  async getFlightOffers(@Payload() data: GetFlightOffersDto) {
    return this.externalApiIntegrationService.getFlightOffers(data);
  }
}
