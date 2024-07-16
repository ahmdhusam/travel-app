import { Module } from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { ExternalApiIntegrationController } from './external-api-integration.controller';

@Module({
  controllers: [ExternalApiIntegrationController],
  providers: [ExternalApiIntegrationService],
})
export class ExternalApiIntegrationModule {}
