import { NestFactory } from '@nestjs/core';
import { ExternalApiIntegrationModule } from './external-api-integration.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ExternalApiIntegrationModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
