import { Module } from '@nestjs/common';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { AmadeusService } from './services/amadeus.service';
import { HttpModule } from '@nestjs/axios';
import { GlobalMicroServicesProviders } from '@app/core/settings/global-microservices-providers';
import { ExternalApiIntegrationServiceProviders } from './enums/external-api-integration-service-providers.enum';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    HttpModule.register({
      timeout: 10_000, // 10s
      baseURL: 'https://test.api.amadeus.com',
    }),
  ],
  controllers: [ExternalApiIntegrationController],
  providers: [
    ...GlobalMicroServicesProviders,
    ExternalApiIntegrationService,
    {
      provide: ExternalApiIntegrationServiceProviders.AMADEUS_SERVICE,
      useClass: AmadeusService,
    },
  ],
})
export class ExternalApiIntegrationModule {}
