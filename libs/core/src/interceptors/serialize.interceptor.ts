import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { GlobalSerialize } from '../dtos/global.serialize';

@Injectable()
export class SerializeInterceptor<T> implements NestInterceptor {
  constructor(private readonly Dto: ClassConstructor<T>) {}

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      map((value) =>
        plainToClass(this.Dto, value, {
          excludeExtraneousValues: this.Dto !== GlobalSerialize,
          enableImplicitConversion: true,
        }),
      ),
    );
  }
}
