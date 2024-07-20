import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-providers.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalMicroServicesProviders } from '@app/core/settings/global-microservices-providers';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: FlightsProviders.ExternalApiIntegrationClient,
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          return {
            transport: Transport.TCP,
            options: {
              port: configService.getOrThrow('EXTERNAL_API_INTEGRATION.PORT'),
            },
          };
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [...GlobalMicroServicesProviders, FlightsService],
})
export class FlightsModule {}
