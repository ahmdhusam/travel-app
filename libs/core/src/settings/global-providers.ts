import { ValidationPipe } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { GlobalSerialize } from '../dtos/global.serialize';

export const GlobalProviders = [
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
    }),
  },
];
