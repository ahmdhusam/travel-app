import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiIntegrationService } from './external-api-integration.service';

describe('ExternalApiIntegrationService', () => {
  let service: ExternalApiIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExternalApiIntegrationService],
    }).compile();

    service = module.get<ExternalApiIntegrationService>(
      ExternalApiIntegrationService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
