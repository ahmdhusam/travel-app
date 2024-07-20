import { Controller } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AmadeusFlightOffersRequestDto } from './services/dto/amadeus-request.dto';
import { ExternalApiIntegrationEvents } from './enums/external-api-integration-events.enum';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';
import { AmadeusFlightOffersResponseDto } from './services/dto/amadeus-response.dto';

@Controller()
export class ExternalApiIntegrationController {
  constructor(
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  @UseSerialize(AmadeusFlightOffersResponseDto)
  @MessagePattern(ExternalApiIntegrationEvents.GET_FLIGHT_OFFERS)
  async getFlightOffers(@Payload() data: AmadeusFlightOffersRequestDto) {
    return this.externalApiIntegrationService.getFlightOffers(data);
  }
}
