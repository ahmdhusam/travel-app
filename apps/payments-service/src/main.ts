import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(PaymentsModule);
  const configService = appContext.get(ConfigService);
  const port = configService.getOrThrow('PAYMENTS_SERVICE.PORT');
  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PaymentsModule,
    {
      transport: Transport.TCP,
      // TODO: make it 3000 for all and expose it from docker container
      options: {
        host: '0.0.0.0',
        port: parseInt(port),
      },
    },
  );

  await app.listen();
}
bootstrap();
