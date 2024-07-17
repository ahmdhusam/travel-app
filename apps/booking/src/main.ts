import { NestFactory } from '@nestjs/core';
import { BookingModule } from './booking.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(BookingModule);
  const configService = appContext.get(ConfigService);
  const port = configService.getOrThrow('BOOKING.PORT');
  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    BookingModule,
    {
      transport: Transport.TCP,
      // TODO: make it 3000 for all and expose it from docker container
      options: {
        port: parseInt(port),
      },
    },
  );

  await app.listen();
}
bootstrap();
