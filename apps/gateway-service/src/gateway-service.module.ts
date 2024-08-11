import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { FlightsModule } from './flights-search/flights-search.module';
import { GlobalProviders } from '@app/core/settings/global-providers';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
    FlightsModule,
    BookingModule,
  ],
  providers: GlobalProviders,
})
export class AppModule {}
