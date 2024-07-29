import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { PaypalService } from './services/paypal.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    HttpModule.register({
      timeout: 10_000, // 10s
      baseURL: 'https://api-m.sandbox.paypal.com',
    }),
  ],
  controllers: [PaymentsController],
  providers: [PaymentsService, PaypalService],
})
export class PaymentsModule {}
