import { Test, TestingModule } from '@nestjs/testing';
import { LoggingAndMonitoringController } from './logging-and-monitoring.controller';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';

describe('LoggingAndMonitoringController', () => {
  let controller: LoggingAndMonitoringController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoggingAndMonitoringController],
      providers: [LoggingAndMonitoringService],
    }).compile();

    controller = module.get<LoggingAndMonitoringController>(
      LoggingAndMonitoringController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
