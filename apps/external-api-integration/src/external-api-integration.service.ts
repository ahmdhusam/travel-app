import { Injectable } from '@nestjs/common';

@Injectable()
export class ExternalApiIntegrationService {
  getHello(): string {
    return 'Hello World!';
  }
}
