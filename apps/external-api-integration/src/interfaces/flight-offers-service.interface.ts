export interface IFlightOffersService {
  getFlightOffers<TReq, TRes>(a: TReq): Promise<TRes[]>;
}
