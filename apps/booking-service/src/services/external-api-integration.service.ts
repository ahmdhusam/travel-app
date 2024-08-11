import { Inject, Injectable } from '@nestjs/common';
import { BookingServiceProviders } from '../enums/booking-service-providers.enum';
import { ClientProxy } from '@nestjs/microservices';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { ExternalApiIntegrationServiceEvents } from '@app/core/enums/external-api-integration-service-events.enum';
import { map } from 'rxjs';

@Injectable()
export class ExternalApiIntegrationService {
  constructor(
    @Inject(BookingServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT)
    private readonly externalApiIntegrationServiceClient: ClientProxy,
  ) {}

  createFlightOrder(
    flightOrder: CreateFlightOrderDto,
  ): Promise<{ id: string }> {
    return this.externalApiIntegrationServiceClient
      .send(
        ExternalApiIntegrationServiceEvents.CREATE_FLIGHT_ORDER,
        flightOrder,
      )
      .pipe(map((flightOrder) => ({ id: flightOrder.data.id })))
      .toPromise();
  }
}
