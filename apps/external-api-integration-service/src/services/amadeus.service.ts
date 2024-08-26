import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { IFlightOffersService } from '../interfaces/flight-offers-service.interface';
import { ConfigService } from '@nestjs/config';
import {
  CreateFlightOrderDto,
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  FlightOrderSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';
import { CredentialsState } from '@app/core/utils/CredentialsState';

@Injectable()
export class AmadeusService
  implements IFlightOffersService, OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    const credentialsState = new CredentialsState();

    this.httpService.axiosRef.interceptors.request.use(async (config) => {
      if (
        credentialsState.isExpired() &&
        !config.url.endsWith('/security/oauth2/token')
      ) {
        if ('Authorization' in this.httpService.axiosRef.defaults.headers)
          delete this.httpService.axiosRef.defaults.headers.Authorization;

        const credentials = await this.getCredentials();

        credentialsState.extendExpirationBy(credentials.expires_in);

        this.httpService.axiosRef.defaults.headers.Authorization = `Bearer ${credentials.access_token}`;
        config.headers.Authorization = `Bearer ${credentials.access_token}`;
      }

      return config;
    });
  }

  onModuleDestroy() {
    this.httpService.axiosRef.interceptors.request.clear();
  }

  getFlightOffers(
    searchCriteria: GetFlightOffersDto,
  ): Observable<FlightOffersSerialize> {
    return this.httpService
      .get(`/v2/shopping/flight-offers`, {
        params: {
          currencyCode: 'USD',
          ...searchCriteria,
        },
      })
      .pipe(map((response) => response.data));
  }

  getFlightPrice(
    flightOfferPriceDto: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize> {
    return this.httpService
      .post(
        `/v1/shopping/flight-offers/pricing`,
        {
          data: {
            type: 'flight-offers-pricing',
            flightOffers: [flightOfferPriceDto.flightOffer],
          },
        },
        {
          headers: {
            'Content-Type': 'application/vnd.amadeus+json',
            'X-HTTP-Method-Override': 'GET',
          },
        },
      )
      .pipe(
        map((response) => ({
          flightOffer: response.data.data.flightOffers[0],
        })),
      );
  }

  createFlightOrder(
    flightOrderDto: CreateFlightOrderDto,
  ): Observable<FlightOrderSerialize> {
    return this.httpService
      .post(
        `/v1/booking/flight-orders`,
        {
          data: {
            type: 'flight-order',
            flightOffers: [flightOrderDto.flightOffer],
            travelers: flightOrderDto.travelers,
          },
        },
        {
          headers: {
            'Content-Type': 'application/vnd.amadeus+json',
          },
        },
      )
      .pipe(map((response) => ({ id: response.data.data.id })));
  }

  async getCredentials(): Promise<{
    expires_in: number;
    access_token: string;
  }> {
    return this.httpService
      .post(
        '/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: this.configService.getOrThrow(
            'EXTERNAL_API_INTEGRATION_SERVICE.AMADEUS.CLIENT_ID',
          ),
          client_secret: this.configService.getOrThrow(
            'EXTERNAL_API_INTEGRATION_SERVICE.AMADEUS.CLIENT_SECRET',
          ),
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
