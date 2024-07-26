import { Observable } from 'rxjs';

export interface IFlightOffersService {
  getFlightOffers<TReq, TRes>(a: TReq): Observable<TRes>;
}
