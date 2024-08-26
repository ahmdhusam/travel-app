import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class PaymentOrderSerialize {
  @Expose()
  @IsString()
  id: string;
}
