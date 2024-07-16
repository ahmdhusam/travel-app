import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';

describe('ExternalApiIntegrationController', () => {
  let controller: ExternalApiIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExternalApiIntegrationController],
      providers: [ExternalApiIntegrationService],
    }).compile();

    controller = module.get<ExternalApiIntegrationController>(
      ExternalApiIntegrationController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
