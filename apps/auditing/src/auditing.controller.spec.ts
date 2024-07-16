import { Test, TestingModule } from '@nestjs/testing';
import { AuditingController } from './auditing.controller';
import { AuditingService } from './auditing.service';

describe('AuditingController', () => {
  let auditingController: AuditingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuditingController],
      providers: [AuditingService],
    }).compile();

    auditingController = app.get<AuditingController>(AuditingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(auditingController.getHello()).toBe('Hello World!');
    });
  });
});
