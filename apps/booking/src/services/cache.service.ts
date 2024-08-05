import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { isDefined } from 'class-validator';
import { catchError, from, map, Observable, throwError } from 'rxjs';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  setFlightOfferDetails(
    paymentOrderId: string,
    flightOfferOrder: CreateFlightOrderDto,
  ): Observable<void> {
    return from(this.cacheManager.set(paymentOrderId, flightOfferOrder));
  }

  getFlightOfferDetailsOrThrow(
    paymentOrderId: string,
  ): Observable<CreateFlightOrderDto> {
    return from(this.cacheManager.get(paymentOrderId)).pipe(
      map((flightOfferDetails: CreateFlightOrderDto) => {
        if (!isDefined(flightOfferDetails)) {
          throw new BadRequestException();
        }

        return flightOfferDetails;
      }),
      catchError((_err) => throwError(() => new BadRequestException())),
    );
  }
}
