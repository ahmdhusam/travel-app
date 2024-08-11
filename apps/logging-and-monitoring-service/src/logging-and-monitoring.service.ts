import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggingAndMonitoringService {
  getHello(): string {
    return 'Hello World!';
  }
}
