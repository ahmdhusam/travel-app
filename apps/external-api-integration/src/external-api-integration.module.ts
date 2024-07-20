import { Module } from '@nestjs/common';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmadeusService } from './services/amadeus.service';
import { HttpModule } from '@nestjs/axios';
import { GlobalMicroServicesProviders } from '@app/core/settings/global-microservices-providers';
import { ExternalApiIntegrationProviders } from './enums/external-api-integration-providers.enum';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          timeout: 10000, // 10s
          headers: {
            Authorization: `Bearer ${configService.getOrThrow('EXTERNAL_API_INTEGRATION.AMADEUS.APIKEY')}`,
            'Content-Type': 'application/vnd.amadeus+json',
            'X-HTTP-Method-Override': 'GET',
          },
          baseURL: 'test.api.amadeus.com/v2/shopping',
        };
      },
    }),
  ],
  controllers: [ExternalApiIntegrationController],
  providers: [
    ...GlobalMicroServicesProviders,
    ExternalApiIntegrationService,
    {
      provide: ExternalApiIntegrationProviders.AMADEUS_SERVICE,
      useClass: AmadeusService,
    },
  ],
})
export class ExternalApiIntegrationModule {}
