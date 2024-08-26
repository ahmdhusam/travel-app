import {
  CreateFlightOrderDto,
  FlightOfferPriceSerialize,
  FlightOffersSerialize,
  FlightOrderSerialize,
  GetFlightOfferPriceDto,
  GetFlightOffersDto,
} from 'apps/shared/dtos/amadeus-data-model.dto';
import { Observable } from 'rxjs';

export interface IFlightOffersService {
  getFlightOffers(_: GetFlightOffersDto): Observable<FlightOffersSerialize>;
  getFlightPrice(
    _: GetFlightOfferPriceDto,
  ): Observable<FlightOfferPriceSerialize>;
  createFlightOrder(_: CreateFlightOrderDto): Observable<FlightOrderSerialize>;
}
