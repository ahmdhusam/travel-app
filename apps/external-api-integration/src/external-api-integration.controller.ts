import { Controller, Get } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';

@Controller()
export class ExternalApiIntegrationController {
  constructor(private readonly externalApiIntegrationService: ExternalApiIntegrationService) {}

  @Get()
  getHello(): string {
    return this.externalApiIntegrationService.getHello();
  }
}
