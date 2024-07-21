import {
  IsString,
  IsArray,
  ValidateNested,
  IsObject,
  IsOptional,
  IsIn,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

class DepartureDateTimeRange {
  @IsDateString()
  date: string;

  @IsString()
  time: string;
}

class OriginDestination {
  @IsString()
  id: string;

  @IsString()
  originLocationCode: string;

  @IsString()
  destinationLocationCode: string;

  @IsObject()
  @ValidateNested()
  @Type(() => DepartureDateTimeRange)
  departureDateTimeRange: DepartureDateTimeRange;
}

class Traveler {
  @IsString()
  id: string;

  @IsIn(['ADULT', 'CHILD', 'INFANT'])
  travelerType: string;
}

class CabinRestriction {
  @IsString()
  cabin: string;

  @IsString()
  coverage: string;

  @IsArray()
  @IsString({ each: true })
  originDestinationIds: string[];
}

class FlightFilters {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CabinRestriction)
  cabinRestrictions: CabinRestriction[];
}

class SearchCriteria {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => FlightFilters)
  flightFilters?: FlightFilters;

  @IsOptional()
  @IsNumber()
  maxFlightOffers?: number;
}

export class AmadeusFlightOffersRequestDto {
  @IsString()
  currencyCode: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OriginDestination)
  originDestinations: OriginDestination[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Traveler)
  travelers: Traveler[];

  @IsArray()
  @IsString({ each: true })
  sources: string[];

  @IsObject()
  @ValidateNested()
  @Type(() => SearchCriteria)
  searchCriteria: SearchCriteria;
}
