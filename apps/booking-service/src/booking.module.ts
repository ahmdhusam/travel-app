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
import { FlightsSearchAdapter } from './adapters/flights-search.adapter';
import { OrdersAdapter } from './adapters/orders.adapter';
import { PaymentAdapter } from './adapters/payment.adapter';
import { ExternalApiIntegrationAdapter } from './adapters/external-api-integration.adapter';
import { Transaction } from './models/transaction.model';
import { TransactionAdapter } from './adapters/transaction.adapter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    SequelizeModule.forFeature([FlightBooking, Transaction]),
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
          url: `redis://${configService.getOrThrow('BOOKING_SERVICE.CACHE_MANAGER.HOST')}:${configService.getOrThrow('BOOKING_SERVICE.CACHE_MANAGER.PORT')}`,
        };
      },
    }),
  ],
  controllers: [BookingController],
  providers: [
    BookingService,
    FlightsSearchAdapter,
    OrdersAdapter,
    PaymentAdapter,
    ExternalApiIntegrationAdapter,
    TransactionAdapter,
  ],
})
export class BookingModule {}
