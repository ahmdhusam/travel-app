import { Module } from '@nestjs/common';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AmadeusService } from './services/amadeus.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { GlobalMicroServicesProviders } from '@app/core/settings/global-microservices-providers';
import { ExternalApiIntegrationProviders } from './enums/external-api-integration-providers.enum';
import { map } from 'rxjs';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    HttpModule.registerAsync({
      inject: [ConfigService],
      async useFactory(configService: ConfigService) {
        const httpService = new HttpService();

        const credentials = await httpService
          .post(
            'https://test.api.amadeus.com/v1/security/oauth2/token',
            new URLSearchParams({
              grant_type: configService.getOrThrow(
                'EXTERNAL_API_INTEGRATION.AMADEUS.GRANT_TYPE',
              ),
              client_id: configService.getOrThrow(
                'EXTERNAL_API_INTEGRATION.AMADEUS.CLIENT_ID',
              ),
              client_secret: configService.getOrThrow(
                'EXTERNAL_API_INTEGRATION.AMADEUS.CLIENT_SECRET',
              ),
            }).toString(),
            {
              timeout: 10000,
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
            },
          )
          .pipe(map((response) => response.data))
          .toPromise();

        return {
          timeout: 10000, // 10s
          headers: {
            Authorization: `Bearer ${credentials.access_token}`,
            'Content-Type': 'application/vnd.amadeus+json',
            'X-HTTP-Method-Override': 'GET',
          },
          baseURL: 'https://test.api.amadeus.com/v2/shopping',
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
