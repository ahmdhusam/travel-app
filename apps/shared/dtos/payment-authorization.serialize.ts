import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PaymentAuthorizationSerialize {
  @Expose()
  @IsString()
  id: string;
}
