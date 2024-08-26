import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-providers.enum';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: FlightsProviders.FLIGHTS_SERVICE_CLIENT,
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          return {
            transport: Transport.TCP,
            options: {
              port: configService.getOrThrow('FLIGHTS_SERVICE.PORT'),
            },
          };
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsService],
})
export class FlightsModule {}
