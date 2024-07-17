import { Module } from '@nestjs/common';
import { ExternalApiIntegrationController } from './external-api-integration.controller';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
  ],
  controllers: [ExternalApiIntegrationController],
  providers: [ExternalApiIntegrationService],
})
export class ExternalApiIntegrationModule {}
