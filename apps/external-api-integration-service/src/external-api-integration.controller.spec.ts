import { Test, TestingModule } from '@nestjs/testing';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';

describe('ExternalApiIntegrationController', () => {
  let externalApiIntegrationController: ExternalApiIntegrationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ExternalApiIntegrationController],
      providers: [ExternalApiIntegrationService],
    }).compile();

    externalApiIntegrationController =
      app.get<ExternalApiIntegrationController>(
        ExternalApiIntegrationController,
      );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(externalApiIntegrationController.getHello()).toBe('Hello World!');
    });
  });
});
