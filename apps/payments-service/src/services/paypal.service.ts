import { CredentialsState } from '@app/core/utils/CredentialsState';
import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';
import { PaymentFeesService } from './payment-fees.service';
import { PaymentOrderSerialize } from 'apps/shared/dtos/payment-order.serialize';
import { PaymentAuthorizationSerialize } from 'apps/shared/dtos/payment-authorization.serialize';

@Injectable()
export class PaypalService implements OnModuleInit, OnModuleDestroy {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly paymentFeesService: PaymentFeesService,
  ) {}

  onModuleInit() {
    const credentialsState = new CredentialsState();

    this.httpService.axiosRef.interceptors.request.use(async (config) => {
      if (
        credentialsState.isExpired() &&
        !config.url.endsWith('/oauth2/token')
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

  createOrder(amount: number): Observable<PaymentOrderSerialize> {
    return this.httpService
      .post('/v2/checkout/orders', {
        intent: 'AUTHORIZE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.paymentFeesService
                .calculateTransactionFees(amount)
                .toFixed(2),
            },
          },
        ],
      })
      .pipe(map((res) => ({ id: res.data.id })));
  }

  checkAuthorization(
    orderId: string,
  ): Observable<PaymentAuthorizationSerialize> {
    return this.httpService
      .post(`/v2/checkout/orders/${orderId}/authorize`, {})
      .pipe(
        map((res) => res.data.purchase_units[0].payments.authorizations[0]),
        map((authorization) => ({ id: authorization.id })),
      );
  }

  getOrderDetails(orderId: string): Observable<unknown> {
    return this.httpService
      .get(`/v2/checkout/orders/${orderId}`)
      .pipe(map((res) => res.data));
  }

  getAuthorizedPaymentDetails(authorizationId: string): Observable<unknown> {
    return this.httpService
      .get(`/v2/payments/authorizations/${authorizationId}`)
      .pipe(map((res) => res.data));
  }

  voidAuthorization(authorizationId: string): Observable<void> {
    return this.httpService
      .post(`/v2/payments/authorizations/${authorizationId}/void`, {})
      .pipe(map(() => {}));
  }

  capturePayment(authorizationId: string): Observable<void> {
    return this.httpService
      .post(`/v2/payments/authorizations/${authorizationId}/capture`, {})
      .pipe(map(() => {}));
  }

  // /v1/oauth2/token
  getCredentials(): Promise<{
    expires_in: number;
    access_token: string;
  }> {
    return this.httpService
      .post(
        '/v1/oauth2/token',
        new URLSearchParams({
          grant_type: 'client_credentials',
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: this.configService.getOrThrow(
              'PAYMENTS_SERVICE.PAYPAL.CLIENT_ID',
            ),
            password: this.configService.getOrThrow(
              'PAYMENTS_SERVICE.PAYPAL.CLIENT_SECRET',
            ),
          },
        },
      )
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
