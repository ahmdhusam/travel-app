import { Controller, Get } from '@nestjs/common';
import { AuditingService } from './auditing.service';

@Controller()
export class AuditingController {
  constructor(private readonly auditingService: AuditingService) {}

  @Get()
  getHello(): string {
    return this.auditingService.getHello();
  }
}
