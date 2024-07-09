import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';
import { CreateLoggingAndMonitoringDto } from './dto/create-logging-and-monitoring.dto';
import { UpdateLoggingAndMonitoringDto } from './dto/update-logging-and-monitoring.dto';

@Controller('logging-and-monitoring')
export class LoggingAndMonitoringController {
  constructor(
    private readonly loggingAndMonitoringService: LoggingAndMonitoringService,
  ) {}

  @Post()
  create(@Body() createLoggingAndMonitoringDto: CreateLoggingAndMonitoringDto) {
    return this.loggingAndMonitoringService.create(
      createLoggingAndMonitoringDto,
    );
  }

  @Get()
  findAll() {
    return this.loggingAndMonitoringService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loggingAndMonitoringService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLoggingAndMonitoringDto: UpdateLoggingAndMonitoringDto,
  ) {
    return this.loggingAndMonitoringService.update(
      +id,
      updateLoggingAndMonitoringDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loggingAndMonitoringService.remove(+id);
  }
}
