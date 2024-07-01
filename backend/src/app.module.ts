import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { HotelsModule } from './hotels/hotels.module';

@Module({
  imports: [BookingModule, HotelsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
