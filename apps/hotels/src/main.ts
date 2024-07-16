import { NestFactory } from '@nestjs/core';
import { HotelsModule } from './hotels.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    HotelsModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
