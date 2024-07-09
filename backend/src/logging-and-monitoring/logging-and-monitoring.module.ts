import { Module } from '@nestjs/common';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';
import { LoggingAndMonitoringController } from './logging-and-monitoring.controller';

@Module({
  controllers: [LoggingAndMonitoringController],
  providers: [LoggingAndMonitoringService],
})
export class LoggingAndMonitoringModule {}
