import { Module } from '@nestjs/common';
import { LoggingAndMonitoringController } from './logging-and-monitoring.controller';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  controllers: [LoggingAndMonitoringController],
  providers: [LoggingAndMonitoringService],
})
export class LoggingAndMonitoringModule {}
