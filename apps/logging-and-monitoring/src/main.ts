import { NestFactory } from '@nestjs/core';
import { LoggingAndMonitoringModule } from './logging-and-monitoring.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    LoggingAndMonitoringModule,
  );
  const configService = appContext.get(ConfigService);
  const port = configService.getOrThrow('LOGGING_AND_MONITORING.PORT');
  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    LoggingAndMonitoringModule,
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
