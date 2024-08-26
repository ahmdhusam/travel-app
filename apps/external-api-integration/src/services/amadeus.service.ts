import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { IFlightOffersService } from '../interfaces/flight-offers-service.interface';
import { ConfigService } from '@nestjs/config';
import {
  FlightOfferDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

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

  getFlightOffers<TReq = GetFlightOffersDto, TRes = unknown>(
    searchCriteria: TReq,
  ): Observable<TRes> {
    return this.httpService
      .post(`/v2/shopping/flight-offers`, searchCriteria, {
        headers: {
          'Content-Type': 'application/vnd.amadeus+json',
          'X-HTTP-Method-Override': 'GET',
        },
      })
      .pipe(map((response) => response.data));
  }

  getFlightPrice<TReq = FlightOfferDto[], TRes = unknown>(
    flightOffers: TReq,
  ): Observable<TRes> {
    return this.httpService
      .post(
        `/v1/shopping/flight-offers/pricing`,
        {
          data: {
            type: 'flight-offers-pricing',
            flightOffers,
          },
        },
        {
          headers: {
            'Content-Type': 'application/vnd.amadeus+json',
            'X-HTTP-Method-Override': 'GET',
          },
        },
      )
      .pipe(map((response) => response.data));
  }

  async getCredentials(): Promise<{
    expires_in: number;
    access_token: string;
  }> {
    return this.httpService
      .post(
        '/v1/security/oauth2/token',
        new URLSearchParams({
          grant_type: this.configService.getOrThrow(
            'EXTERNAL_API_INTEGRATION_SERVICE.AMADEUS.GRANT_TYPE',
          ),
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

class CredentialsState {
  private expiresIn: Date = new Date();

  isExpired(): boolean {
    return this.expiresIn.getTime() < Date.now();
  }

  extendExpirationBy(seconds: number): void {
    const currentDate = new Date();
    currentDate.setSeconds(currentDate.getSeconds() + seconds - 5);
    this.expiresIn = currentDate;
  }
}
