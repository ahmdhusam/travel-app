import { Injectable, NotImplementedException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  create(_createBookingDto: CreateBookingDto) {
    throw new NotImplementedException('Not Implemented');
  }

  findAll() {
    throw new NotImplementedException('Not Implemented');
  }

  findOne(_id: number) {
    throw new NotImplementedException('Not Implemented');
  }

  cancel(_id: number) {
    throw new NotImplementedException('Not Implemented');
  }
}
