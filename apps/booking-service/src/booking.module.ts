import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { FlightBooking } from './models/booking.model';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookingServiceProviders } from './enums/booking-service-providers.enum';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { CacheService } from './services/cache.service';
import { FlightsSearchService } from './services/flights-search.service';
import { OrderService } from './services/order.service';
import { PaymentService } from './services/payment.service';
import { ExternalApiIntegrationService } from './services/external-api-integration.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    SequelizeModule.forFeature([FlightBooking]),
    ClientsModule.registerAsync([
      {
        name: BookingServiceProviders.EXTERNAL_API_INTEGRATION_SERVICE_CLIENT,
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
    ClientsModule.registerAsync([
      {
        name: BookingServiceProviders.FLIGHTS_SERVICE_CLIENT,
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow('FLIGHTS_SEARCH_SERVICE.HOST'),
              port: configService.getOrThrow('FLIGHTS_SEARCH_SERVICE.PORT'),
            },
          };
        },
      },
    ]),
    ClientsModule.registerAsync([
      {
        name: BookingServiceProviders.PAYMENTS_SERVICE_CLIENT,
        inject: [ConfigService],
        useFactory(configService: ConfigService) {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow('PAYMENTS_SERVICE.HOST'),
              port: configService.getOrThrow('PAYMENTS_SERVICE.PORT'),
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
          host: configService.getOrThrow('BOOKING_SERVICE.CACHE_MANAGER.HOST'),
          port: configService.getOrThrow('BOOKING_SERVICE.CACHE_MANAGER.PORT'),
        };
      },
    }),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    CacheService,
    FlightsSearchService,
    OrderService,
    PaymentService,
    ExternalApiIntegrationService,
  ],
})
export class BookingModule {}
