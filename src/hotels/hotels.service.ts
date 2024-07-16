import { Injectable, NotImplementedException } from '@nestjs/common';

@Injectable()
export class HotelsService {
  filter() {
    throw new NotImplementedException('Not Implemented');
  }

  search() {
    throw new NotImplementedException('Not Implemented');
  }
}
