import { Inject, Injectable } from '@nestjs/common';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateFlightOrderDto,
  FlightOrderSerialize,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';

@Injectable()
export class ExternalApiIntegrationAdapter {
  constructor(
    @Inject(BookingServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT)
    private readonly externalApiIntegrationServiceClient: ClientProxy,
  ) {}

  createFlightOrder(
    flightOrderDto: CreateFlightOrderDto,
  ): Promise<FlightOrderSerialize> {
    return this.externalApiIntegrationServiceClient
      .send(
        ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER,
        flightOrderDto,
      )
      .toPromise();
  }
}
