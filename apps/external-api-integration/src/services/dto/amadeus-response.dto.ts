import { Expose, Type } from 'class-transformer';

class Departure {
  @Expose()
  iataCode: string;

  @Expose()
  at: string;
}

class Arrival {
  @Expose()
  iataCode: string;

  @Expose()
  at: string;
}

class Segment {
  @Expose()
  @Type(() => Departure)
  departure: Departure;

  @Expose()
  @Type(() => Arrival)
  arrival: Arrival;

  @Expose()
  carrierCode: string;

  @Expose()
  number: string;

  @Expose()
  @Type(() => Object)
  aircraft: { code: string };

  @Expose()
  @Type(() => Object)
  operating: { carrierCode: string };

  @Expose()
  duration: string;

  @Expose()
  id: string;

  @Expose()
  numberOfStops: number;

  @Expose()
  blacklistedInEU: boolean;
}

class Itinerary {
  @Expose()
  duration: string;

  @Expose()
  @Type(() => Segment)
  segments: Segment[];
}

class Price {
  @Expose()
  currency: string;

  @Expose()
  total: string;

  @Expose()
  base: string;

  @Expose()
  @Type(() => Object)
  fees: { amount: string; type: string }[];

  @Expose()
  grandTotal: string;
}

class TravelerPricing {
  @Expose()
  travelerId: string;

  @Expose()
  fareOption: string;

  @Expose()
  travelerType: string;

  @Expose()
  @Type(() => Price)
  price: Price;

  @Expose()
  @Type(() => Object)
  fareDetailsBySegment: {
    segmentId: string;
    cabin: string;
    fareBasis: string;
    class: string;
    includedCheckedBags: { quantity: number };
  }[];
}

class FlightOffer {
  @Expose()
  type: string;

  @Expose()
  id: string;

  @Expose()
  source: string;

  @Expose()
  instantTicketingRequired: boolean;

  @Expose()
  nonHomogeneous: boolean;

  @Expose()
  oneWay: boolean;

  @Expose()
  lastTicketingDate: string;

  @Expose()
  numberOfBookableSeats: number;

  @Expose()
  @Type(() => Itinerary)
  itineraries: Itinerary[];

  @Expose()
  @Type(() => Price)
  price: Price;

  @Expose()
  @Type(() => Object)
  pricingOptions: { fareType: string[]; includedCheckedBagsOnly: boolean };

  @Expose()
  @Type(() => Object)
  validatingAirlineCodes: string[];

  @Expose()
  @Type(() => TravelerPricing)
  travelerPricings: TravelerPricing[];
}

class Meta {
  @Expose()
  count: number;
}

class Dictionary {
  @Expose()
  locations: object;

  @Expose()
  aircraft: object;

  @Expose()
  currencies: object;

  @Expose()
  carriers: object;
}

export class AmadeusFlightOffersResponseDto {
  @Expose()
  @Type(() => Meta)
  meta: Meta;

  @Expose()
  @Type(() => FlightOffer)
  data: FlightOffer[];

  @Expose()
  @Type(() => Dictionary)
  dictionaries: Dictionary;
}
