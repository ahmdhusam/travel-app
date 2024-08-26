import { Observable } from 'rxjs';

export interface IFlightOffersService {
  getFlightOffers<TReq, TRes>(_: TReq): Observable<TRes>;
  getFlightPrice<TReq, TRes>(_: TReq): Observable<TRes>;
}
