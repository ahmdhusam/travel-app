import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { ClassConstructor } from 'class-transformer';

export const UseSerialize = <T>(Dto: ClassConstructor<T>) =>
  UseInterceptors(new SerializeInterceptor(Dto));
