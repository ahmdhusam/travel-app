import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';
import { createHash } from 'crypto';
import { isDefined } from 'class-validator';

@Injectable()
export class FlightSearchCachingInterceptor implements NestInterceptor {
  constructor(@Inject(CACHE_MANAGER) protected readonly cacheManager: Cache) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const criteriaAsString = JSON.stringify(context.switchToRpc().getData());

    const key = 'usersId:'.concat(
      createHash('sha1').update(criteriaAsString).digest('hex'),
    );

    // TODO: set userId.
    const cached = await this.cacheManager.get(key);
    if (isDefined(cached)) return of(cached);

    return next.handle().pipe(
      switchMap((result) => {
        return forkJoin(of(result), this.cacheManager.set(key, result)).pipe(
          catchError((_err) => of(result)),
        );
      }),
      map(([result, _setOp]) => result),
    );
  }
}
