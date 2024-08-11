import { Module } from '@nestjs/common';
import { FlightsSearchService } from './flights-search.service';
import { FlightsController } from './flights-search.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-search-providers.enum';
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
              port: configService.getOrThrow('FLIGHTS_SEARCH_SERVICE.PORT'),
            },
          };
        },
      },
    ]),
  ],
  controllers: [FlightsController],
  providers: [FlightsSearchService],
})
export class FlightsModule {}
