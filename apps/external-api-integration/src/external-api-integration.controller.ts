import { Controller } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AmadeusFlightOffersRequestDto } from './services/dto/amadeus-request.dto';
import { ExternalApiIntegrationEvents } from './enums/external-api-integration-events.enum';

@Controller()
export class ExternalApiIntegrationController {
  constructor(
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  @MessagePattern(ExternalApiIntegrationEvents.GET_FLIGHT_OFFERS)
  async getFlightOffers(@Payload() data: AmadeusFlightOffersRequestDto) {
    return this.externalApiIntegrationService.getFlightOffers(data);
  }
}
