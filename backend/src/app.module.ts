import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { HotelsModule } from './hotels/hotels.module';
import { ExternalApiIntegrationModule } from './external-api-integration/external-api-integration.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AuditingModule } from './auditing/auditing.module';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { LoggingAndMonitoringModule } from './logging-and-monitoring/logging-and-monitoring.module';

@Module({
  imports: [
    BookingModule,
    HotelsModule,
    ExternalApiIntegrationModule,
    AuthenticationModule,
    AuditingModule,
    NotificationsModule,
    PaymentsModule,
    LoggingAndMonitoringModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
