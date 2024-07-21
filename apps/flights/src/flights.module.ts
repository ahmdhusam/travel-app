import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FlightsProviders } from './enums/flights-providers.enum';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GlobalMicroServicesProviders } from '@app/core/settings/global-microservices-providers';
import { DatabaseModule } from '@app/database';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';

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
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          ttl: 3 * 60 * 1000, // 3m in milli
          store: redisStore,
          host: configService.getOrThrow('FLIGHTS.CACHE_MANAGER.HOST'),
          port: configService.getOrThrow('FLIGHTS.CACHE_MANAGER.PORT'),
        };
      },
    }),
  ],
  controllers: [FlightsController],
  providers: [...GlobalMicroServicesProviders, FlightsService],
})
export class FlightsModule {}
