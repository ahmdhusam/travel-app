import { FlightsServiceEvents } from '@app/core/enums/flights-service-events.enum';
import { Inject, Injectable } from '@nestjs/common';
import {
  CreateFlightOrderDto,
  FlightOfferDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class FlightService {
  constructor(
    @Inject(BookingServiceProviders.FLIGHTS_SERVICE_CLIENT)
    private readonly flightsServiceClient: ClientProxy,
  ) {}

  async getFlightPrice(flightOffer: FlightOfferDto): Promise<FlightOfferDto> {
    const {
      data: {
        flightOffers: [flightOfferPrice],
      },
    } = await this.flightsServiceClient
      .send(FlightsServiceEvents.GET_FLIGHT_PRICE, [flightOffer])
      .toPromise();

    return flightOfferPrice;
  }

  async createFlightOrder(
    flightOfferDetails: CreateFlightOrderDto,
  ): Promise<{ id: string }> {
    const flightOfferId = await this.flightsServiceClient
      .send(FlightsServiceEvents.CREATE_FLIGHT_ORDER, flightOfferDetails)
      .toPromise();

    return { id: flightOfferId };
  }
}
