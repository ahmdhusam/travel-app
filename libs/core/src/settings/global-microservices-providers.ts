import { ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { GlobalSerialize } from '../dtos/global.serialize';
import { RpcException } from '@nestjs/microservices';

export const GlobalMicroServicesProviders = [
  {
    provide: APP_INTERCEPTOR,
    useValue: new SerializeInterceptor(GlobalSerialize),
  },
  {
    provide: APP_PIPE,
    useValue: new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory(errors) {
        return new RpcException(errors);
      },
    }),
  },
];
