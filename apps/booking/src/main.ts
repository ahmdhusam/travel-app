import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
