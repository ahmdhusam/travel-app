import { Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import { AmadeusFlightOffersRequestDto } from './dto/amadeus-request.dto';
import { AmadeusFlightOffersResponseDto } from './dto/amadeus-response.dto';
import { IFlightOffersService } from '../interfaces/flight-offers-service.interface';

@Injectable()
export class AmadeusService implements IFlightOffersService {
  constructor(private readonly httpService: HttpService) {}

  getFlightOffers<
    TReq = AmadeusFlightOffersRequestDto,
    TRes = AmadeusFlightOffersResponseDto,
  >(searchCriteria: TReq): Promise<TRes[]> {
    return this.httpService
      .post(`/flight-offers`, searchCriteria)
      .pipe(map((response) => response.data))
      .toPromise();
  }
}
