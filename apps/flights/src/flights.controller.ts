import { Controller } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AmadeusFlightOffersRequestDto } from 'apps/external-api-integration/src/services/dto/amadeus-request.dto';
import { FlightsEvents } from './enums/flights-events.enum';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';
import { AmadeusFlightOffersResponseDto } from 'apps/external-api-integration/src/services/dto/amadeus-response.dto';

@Controller()
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @UseSerialize(AmadeusFlightOffersResponseDto)
  @MessagePattern(FlightsEvents.GET_FLIGHT_OFFERS)
  getFlightOffers(@Payload() data: AmadeusFlightOffersRequestDto) {
    return this.flightsService.getFlightOffers(data);
  }
}
