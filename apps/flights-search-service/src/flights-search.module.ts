import { Module } from '@nestjs/common';
import { FlightsController } from './flights-search.controller';
import { FlightsSearchService } from './flights-search.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalMicroServicesProviders } from '@app/core/settings/global-microservices-providers';
import { DatabaseModule } from '@app/database';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { FlightsSearchServiceProviders } from './enums/flights-search-service-providers.enum';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: FlightsSearchServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT,
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow(
                'EXTERNAL_API_INTEGRATION_SERVICE.HOST',
              ),
              port: configService.getOrThrow(
                'EXTERNAL_API_INTEGRATION_SERVICE.PORT',
              ),
            },
          };
        },
      },
    ]),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ttl: 3 * 60 * 1000, // 3m in milli
          store: redisStore,
          host: configService.getOrThrow(
            'FLIGHTS_SEARCH_SERVICE.CACHE_MANAGER.HOST',
          ),
          port: configService.getOrThrow(
            'FLIGHTS_SEARCH_SERVICE.CACHE_MANAGER.PORT',
          ),
        };
      },
    }),
  ],
  controllers: [FlightsController],
  providers: [...GlobalMicroServicesProviders, FlightsSearchService],
})
export class FlightsModule {}
