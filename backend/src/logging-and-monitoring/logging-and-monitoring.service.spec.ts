import { Test, TestingModule } from '@nestjs/testing';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';

describe('LoggingAndMonitoringService', () => {
  let service: LoggingAndMonitoringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggingAndMonitoringService],
    }).compile();

    service = module.get<LoggingAndMonitoringService>(
      LoggingAndMonitoringService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
