import { NestFactory } from '@nestjs/core';
import { ExternalApiIntegrationModule } from './external-api-integration.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(
    ExternalApiIntegrationModule,
  );
  const configService = appContext.get(ConfigService);
  const port = configService.getOrThrow(
    'EXTERNAL_API_INTEGRATION_SERVICE.PORT',
  );
  appContext.close();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ExternalApiIntegrationModule,
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
