import { Test, TestingModule } from '@nestjs/testing';
import { LoggingAndMonitoringController } from './logging-and-monitoring.controller';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';

describe('LoggingAndMonitoringController', () => {
  let loggingAndMonitoringController: LoggingAndMonitoringController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LoggingAndMonitoringController],
      providers: [LoggingAndMonitoringService],
    }).compile();

    loggingAndMonitoringController = app.get<LoggingAndMonitoringController>(LoggingAndMonitoringController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(loggingAndMonitoringController.getHello()).toBe('Hello World!');
    });
  });
});
