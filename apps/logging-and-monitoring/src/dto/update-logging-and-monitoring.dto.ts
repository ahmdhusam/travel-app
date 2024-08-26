import { PartialType } from '@nestjs/swagger';
import { CreateLoggingAndMonitoringDto } from './create-logging-and-monitoring.dto';

export class UpdateLoggingAndMonitoringDto extends PartialType(
  CreateLoggingAndMonitoringDto,
) {}
