import { NestFactory } from '@nestjs/core';
import { LoggingAndMonitoringModule } from './logging-and-monitoring.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LoggingAndMonitoringModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
