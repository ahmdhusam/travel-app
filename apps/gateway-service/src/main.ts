import { NestFactory } from '@nestjs/core';
import { AppModule } from './gateway-service.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const API_PREFIX = '/api';
  app
    .enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })
    .setGlobalPrefix(API_PREFIX);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Travel Application')
    .setDescription('The Travel Application API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup(API_PREFIX + '/:version/docs', app, document);

  const PORT = parseInt(configService.getOrThrow('GATEWAY_SERVICE.PORT'));

  await app.listen(PORT);
}
bootstrap();
