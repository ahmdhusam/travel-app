import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditingService {
  getHello(): string {
    return 'Hello World!';
  }
}
