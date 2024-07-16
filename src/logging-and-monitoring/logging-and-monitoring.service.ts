import { Injectable } from '@nestjs/common';
import { CreateLoggingAndMonitoringDto } from './dto/create-logging-and-monitoring.dto';
import { UpdateLoggingAndMonitoringDto } from './dto/update-logging-and-monitoring.dto';

@Injectable()
export class LoggingAndMonitoringService {
  create(createLoggingAndMonitoringDto: CreateLoggingAndMonitoringDto) {
    return 'This action adds a new loggingAndMonitoring';
  }

  findAll() {
    return `This action returns all loggingAndMonitoring`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loggingAndMonitoring`;
  }

  update(
    id: number,
    updateLoggingAndMonitoringDto: UpdateLoggingAndMonitoringDto,
  ) {
    return `This action updates a #${id} loggingAndMonitoring`;
  }

  remove(id: number) {
    return `This action removes a #${id} loggingAndMonitoring`;
  }
}
