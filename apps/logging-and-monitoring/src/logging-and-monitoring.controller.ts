import { Controller, Get } from '@nestjs/common';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';

@Controller()
export class LoggingAndMonitoringController {
  constructor(private readonly loggingAndMonitoringService: LoggingAndMonitoringService) {}

  @Get()
  getHello(): string {
    return this.loggingAndMonitoringService.getHello();
  }
}
