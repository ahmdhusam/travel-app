import { Body, Controller, Post } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { AmadeusFlightOffersRequestDto } from 'apps/external-api-integration/src/services/dto/amadeus-request.dto';
import { UseSerialize } from '@app/core/decorators/serialize.decorator';
import { AmadeusFlightOffersResponseDto } from 'apps/external-api-integration/src/services/dto/amadeus-response.dto';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @UseSerialize(AmadeusFlightOffersResponseDto)
  @Post('search')
  searchFlights(@Body() criteria: AmadeusFlightOffersRequestDto) {
    return this.flightsService.searchFlights(criteria);
  }
}
