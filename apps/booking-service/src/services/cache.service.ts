import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateFlightOrderDto } from 'apps/shared/dtos/amadeus-data-model.dto';
import { isDefined } from 'class-validator';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  setFlightOfferDetails(
    paymentOrderId: string,
    flightOrderDto: CreateFlightOrderDto,
  ): Promise<void> {
    return this.cacheManager.set(paymentOrderId, flightOrderDto);
  }

  async getFlightOfferDetailsOrThrow(
    paymentOrderId: string,
  ): Promise<CreateFlightOrderDto> {
    const flightOrderDto: CreateFlightOrderDto =
      await this.cacheManager.get(paymentOrderId);
    if (!isDefined(flightOrderDto)) throw new BadRequestException();

    return flightOrderDto;
  }
}
