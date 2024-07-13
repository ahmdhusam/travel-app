import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { HotelsModule } from './hotels/hotels.module';
import { ExternalApiIntegrationModule } from './external-api-integration/external-api-integration.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuditingModule } from './auditing/auditing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { LoggingAndMonitoringModule } from './logging-and-monitoring/logging-and-monitoring.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    BookingModule,
    HotelsModule,
    ExternalApiIntegrationModule,
    AuthenticationModule,
    AuditingModule,
    NotificationsModule,
    PaymentsModule,
    LoggingAndMonitoringModule,
    UsersModule,
    TransactionsModule,
  ],
})
export class AppModule {}
