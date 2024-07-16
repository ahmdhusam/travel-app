import { NestFactory } from '@nestjs/core';
import { AuditingModule } from './auditing.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuditingModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
