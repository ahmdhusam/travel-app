import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { FlightsModule } from './flights/flights.module';
import { GlobalProviders } from '@app/core/settings/global-providers';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    FlightsModule,
  ],
  providers: GlobalProviders,
})
export class AppModule {}
