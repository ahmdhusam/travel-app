import { Module } from '@nestjs/common';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  controllers: [ExternalApiIntegrationController],
  providers: [ExternalApiIntegrationService],
})
export class ExternalApiIntegrationModule {}
