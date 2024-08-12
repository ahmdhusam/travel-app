import {
  IsInt,
  IsString,
  IsArray,
  IsEnum,
  ValidateNested,
  IsBoolean,
  Min,
  Max,
  IsOptional,
  IsNumber,
  MinLength,
  MaxLength,
  Matches,
  IsISO8601,
  ArrayNotEmpty,
  IsUrl,
  ArrayMaxSize,
  ArrayMinSize,
  IsNotEmpty,
  IsObject,
  IsDateString,
  IsNumberString,
} from 'class-validator';
import { ApiProperty, ApiResponseProperty, PickType } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

enum TravelClass {
  ECONOMY = 'ECONOMY',
  PREMIUM_ECONOMY = 'PREMIUM_ECONOMY',
  BUSINESS = 'BUSINESS',
  FIRST = 'FIRST',
}

enum FeeType {
  TICKETING = 'TICKETING',
  FORM_OF_PAYMENT = 'FORM_OF_PAYMENT',
  SUPPLIER = 'SUPPLIER',
}

class OneWayCombinationsDTO {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  originDestinationId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  flightOfferIds: string[];
}

class CollectionLinksDTO {
  @IsUrl()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  self: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  next: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  previous: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  last: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  first: string;

  @IsUrl()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  up: string;
}

class LocationValue {
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  cityCode: string;
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  countryCode: string;
}

class AircraftEquipment {
  @IsString()
  @Matches(/[a-zA-Z0-9]{3}/)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  code: string;
}

class OperatingFlight {
  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  carrierCode: string;
}

class FlightEndPoint {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  iataCode: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  terminal?: string;

  @IsISO8601()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  at: string;
}

class FlightStop {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  iataCode: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  duration: string;

  @IsISO8601()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  arrivalAt: string;

  @IsISO8601()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  departureAt: string;
}

class Fee {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  amount: string;

  @IsEnum(FeeType)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  type: FeeType;
}

class Tax {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  amount: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  code: string;
}

class Price {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  currency: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  total: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  base: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Fee)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fees: Fee[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tax)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  taxes: Tax[];

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  refundableTaxes: string;
}

class CollectionMeta {
  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  count: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OneWayCombinationsDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  oneWayCombinations: OneWayCombinationsDTO[];

  @IsOptional()
  @Type(() => CollectionLinksDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  links?: CollectionLinksDTO;
}

class LocationEntry {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  key: string;

  @ValidateNested()
  @Type(() => LocationValue)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  value: LocationValue;
}

class AircraftEntry {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  key: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  value: string; // Manufacturer/model of aircraft
}

class CurrencyEntry {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  key: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  value: string;
}

class CarrierEntry {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  key: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  value: string;
}

class FlightSegment {
  @ValidateNested()
  @Type(() => FlightEndPoint)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  departure: FlightEndPoint;

  @ValidateNested()
  @Type(() => FlightEndPoint)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  arrival: FlightEndPoint;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  carrierCode: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  number: string;

  @ValidateNested()
  @Type(() => AircraftEquipment)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  aircraft: AircraftEquipment;

  @ValidateNested()
  @Type(() => OperatingFlight)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  operating: OperatingFlight;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  duration: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightStop)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  stops: FlightStop[];
}

class OriginalFlightEndPoint {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  iataCode: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  terminal: string;
}

class OriginalFlightStop {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  iataCode: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  duration: string;
}

class PriceDetails {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  currency: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  total: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  base: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  margin?: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  grandTotal: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  billingCurrency?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalService)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  additionalServices?: AdditionalService[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Fee)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fees: Fee[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tax)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  taxes?: Tax[];

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  refundableTaxes?: string;
}

class AdditionalService {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  type: string; // Assuming there's a predefined list of types that can be turned into an enum if needed

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  amount: string;
}

class Co2Emission {
  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  weight: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  weightUnit: string;

  @IsEnum(TravelClass)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  cabin: TravelClass;
}

class DateTimeRange {
  @IsDateString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  date: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  time: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  dateWindow?: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  timeWindow?: string;
}

class OriginDestination {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  originLocationCode: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  destinationLocationCode: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  includedConnectionPoints?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  excludedConnectionPoints?: string[];

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  originRadius?: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  alternativeOriginsCodes?: string[];

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  destinationRadius?: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  alternativeDestinationsCodes?: string[];

  @ValidateNested()
  @Type(() => DateTimeRange)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  departureDateTimeRange: DateTimeRange;

  @ValidateNested()
  @Type(() => DateTimeRange)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  arrivalDateTimeRange: DateTimeRange;
}

class TravelerInfo {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @IsEnum(TravelClass)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  travelerType: TravelClass;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  associatedAdultId: string;
}

class CarrierRestrictions {
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  blacklistedInEUAllowed: boolean;

  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  excludedCarrierCodes: string[];

  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  includedCarrierCodes: string[];
}

class ConnectionRestriction {
  @IsInt()
  @Min(0)
  @Max(2)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  maxNumberOfConnections: number;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  nonStopPreferred: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  airportChangeAllowed: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  technicalStopsAllowed: boolean;
}

class FlightFilters {
  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  crossBorderAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  moreOvernightsAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  returnToDepartureAirport?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  railSegmentAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  busSegmentAllowed?: boolean;

  @IsOptional()
  @IsNumber()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  maxFlightTime?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CarrierRestrictions)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  carrierRestrictions?: CarrierRestrictions;

  @ValidateNested({ each: true })
  @Type(() => CabinRestriction)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  cabinRestrictions: CabinRestriction[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectionRestriction)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  connectionRestriction?: ConnectionRestriction;
}

class SearchCriteria {
  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  excludeAllotments?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  addOneWayOffers?: boolean;

  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  maxFlightOffers: number;

  @IsOptional()
  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  maxPrice?: number;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  allowAlternativeFareOptions?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  oneFlightOfferPerDay?: boolean;

  @ValidateNested()
  @Type(() => FlightFilters)
  @IsObject()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  flightFilters: FlightFilters;
}

enum Coverage {
  MOST_SEGMENTS = 'MOST_SEGMENTS',
  AT_LEAST_ONE_SEGMENT = 'AT_LEAST_ONE_SEGMENT',
  ALL_SEGMENTS = 'ALL_SEGMENTS',
}

class CabinRestriction {
  @IsEnum(TravelClass)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  cabin: TravelClass;

  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  originDestinationIds: string[];

  @IsEnum(Coverage)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  coverage: Coverage;
}

enum FlightOfferSource {
  GDS = 'GDS',
}

enum FareType {
  PUBLISHED = 'PUBLISHED',
}

class PricingOptions {
  @IsEnum(FareType, { each: true })
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fareType: FareType[];

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  includedCheckedBagsOnly?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  refundableFare?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  noRestrictionFare?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  noPenaltyFare?: boolean;
}

class FlightOfferDto {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  type: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @IsEnum(FlightOfferSource)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  source: FlightOfferSource;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  instantTicketingRequired: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  disablePricing?: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  nonHomogeneous: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  oneWay?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  isUpsellOffer?: boolean;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  paymentCardRequired?: boolean;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  lastTicketingDate: string;

  @IsOptional()
  @IsISO8601()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  lastTicketingDateTime?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  numberOfBookableSeats?: number;

  @ValidateNested()
  @Type(() => PriceDetails)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  price: PriceDetails;

  @ValidateNested()
  @Type(() => Itinerary)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  itineraries: Itinerary[];

  @ValidateNested()
  @Type(() => PricingOptions)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  pricingOptions: PricingOptions;

  @IsArray()
  @Type(() => String)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  validatingAirlineCodes: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelerPricingDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  travelerPricings: TravelerPricingDTO[];
}

class Segment {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  numberOfStops: number;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  blacklistedInEU?: boolean;

  @ValidateNested({ each: true })
  @Type(() => Co2Emission)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  co2Emissions: Co2Emission[];

  @ValidateNested()
  @Type(() => FlightEndPoint)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  departure: FlightEndPoint;

  @ValidateNested()
  @Type(() => FlightEndPoint)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  arrival: FlightEndPoint;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  carrierCode: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  number: string;

  @ValidateNested()
  @Type(() => AircraftEquipment)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  aircraft: AircraftEquipment;

  @ValidateNested()
  @Type(() => OperatingFlight)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  operating: OperatingFlight;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  duration: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightStop)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  stops?: FlightStop[];
}

enum TravelerType {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
  SENIOR = 'SENIOR',
  YOUNG = 'YOUNG',
  HELD_INFANT = 'HELD_INFANT',
  SEATED_INFANT = 'SEATED_INFANT',
  STUDENT = 'STUDENT',
}

class Extended_TravelerInfo {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @IsEnum(TravelerType)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  travelerType: TravelerType;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  associatedAdultId: string;
}

class AdditionalInformationDTO {
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  chargeableCheckedBags: boolean;

  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  brandedFares: boolean;
}

enum TravelerPricingFareOption {
  STANDARD = 'STANDARD',
  INCLUSIVE_TOUR = 'INCLUSIVE_TOUR',
  SPANISH_MELILLA_RESIDENT = 'SPANISH_MELILLA_RESIDENT',
  SPANISH_CEUTA_RESIDENT = 'SPANISH_CEUTA_RESIDENT',
  SPANISH_CANARY_RESIDENT = 'SPANISH_CANARY_RESIDENT',
  SPANISH_BALEARIC_RESIDENT = 'SPANISH_BALEARIC_RESIDENT',
  AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS = 'AIR_FRANCE_METROPOLITAN_DISCOUNT_PASS',
  AIR_FRANCE_DOM_DISCOUNT_PASS = 'AIR_FRANCE_DOM_DISCOUNT_PASS',
  AIR_FRANCE_COMBINED_DISCOUNT_PASS = 'AIR_FRANCE_COMBINED_DISCOUNT_PASS',
  AIR_FRANCE_FAMILY = 'AIR_FRANCE_FAMILY',
  ADULT_WITH_COMPANION = 'ADULT_WITH_COMPANION',
  COMPANION = 'COMPANION',
}

enum SliceDiceIndicator {
  LOCAL_AVAILABILITY = 'LOCAL_AVAILABILITY',
  SUB_OD_AVAILABILITY_1 = 'SUB_OD_AVAILABILITY_1',
  SUB_OD_AVAILABILITY_2 = 'SUB_OD_AVAILABILITY_2',
}

enum ServiceName {
  PRIORITY_BOARDING = 'PRIORITY_BOARDING',
  AIRPORT_CHECKIN = 'AIRPORT_CHECKIN',
}

// DTOs

class PriceDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  total: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  base: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeeDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fees?: FeeDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaxDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  taxes?: TaxDTO[];

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  refundableTaxes?: string;
}

class FeeDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  amount: string;

  @IsEnum(FeeType)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  type: FeeType;
}

class TaxDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  code: string;
}

class BaggageAllowanceDTO {
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  quantity?: number;

  @IsInt()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  weight?: number;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  weightUnit?: string;
}

class AllotmentDetailsDTO {
  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  tourName?: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  tourReference?: string;
}

class ChargeableCheckdBagsDTO {
  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  quantity: number;

  @IsInt()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  weight: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  weightUnit: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;
}

class ChargeableSeatDTO {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @Matches(/^[1-9][0-9]{0,2}[A-Z]?$/)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  number: string;
}

class AdditionalServicesRequestDTO {
  @ValidateNested()
  @Type(() => ChargeableCheckdBagsDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  chargeableCheckedBags?: ChargeableCheckdBagsDTO;

  @ValidateNested()
  @Type(() => ChargeableSeatDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  chargeableSeat?: ChargeableSeatDTO;

  @Matches(/^[1-9][0-9]{0,2}[A-Z]?$/)
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  chargeableSeatNumber?: string;

  @IsArray()
  @IsEnum(ServiceName, { each: true })
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  otherServices?: ServiceName[];
}

class FareDetailsBySegmentDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  segmentId: string;

  @IsEnum(TravelClass)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  cabin: TravelClass;

  @Matches(/^[A-Z0-9]{1,18}$/)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fareBasis: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  brandedFare?: string;

  @Matches(/^[A-Z]{1}$/)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  class: string;

  @IsOptional()
  @IsBoolean()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  isAllotment?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => AllotmentDetailsDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  allotmentDetails?: AllotmentDetailsDTO;

  @IsEnum(SliceDiceIndicator)
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  sliceDiceIndicator?: SliceDiceIndicator;

  @ValidateNested()
  @Type(() => BaggageAllowanceDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  includedCheckedBags?: BaggageAllowanceDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdditionalServicesRequestDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  additionalServices?: AdditionalServicesRequestDTO;
}

class TravelerPricingDTO {
  @IsString()
  @IsNotEmpty()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  travelerId: string;

  @IsEnum(TravelerPricingFareOption)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fareOption: TravelerPricingFareOption;

  @IsEnum(TravelerType)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  travelerType: TravelerType;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  associatedAdultId?: string;

  @ValidateNested()
  @Type(() => PriceDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  price: PriceDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FareDetailsBySegmentDTO)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  fareDetailsBySegment: FareDetailsBySegmentDTO[];
}

class Itinerary {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  duration?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(250)
  @ValidateNested({ each: true })
  @Type(() => Segment)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  segments: Segment[];
}

class Dictionaries {
  @ValidateNested()
  @Type(() => LocationEntry)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  locations: LocationEntry[];

  @ValidateNested()
  @Type(() => AircraftEntry)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  aircraft: AircraftEntry[];

  @ValidateNested()
  @Type(() => CurrencyEntry)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  currencies: CurrencyEntry[];

  @ValidateNested()
  @Type(() => CarrierEntry)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  carriers: CarrierEntry[];
}

class NameDto {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  firstName: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  lastName: string;
}

// Phone DTO
class PhoneDto {
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  deviceType: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  countryCallingCode: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  number: string;
}

// Contact DTO
class ContactDto {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  emailAddress: string;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  phones: PhoneDto[];
}

// Document DTO
class DocumentDto {
  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  documentType: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  birthPlace: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  issuanceLocation: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  issuanceDate: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsOptional()
  @ApiResponseProperty()
  number: string;

  @IsString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  expiryDate: string;

  @IsString()
  @Expose()
  @IsOptional()
  @ApiProperty()
  @ApiResponseProperty()
  issuanceCountry: string;

  @IsOptional()
  @IsString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  validityCountry: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsOptional()
  @ApiResponseProperty()
  nationality: string;

  @IsBoolean()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  holder: boolean;
}

class TravelerDto {
  @IsNumberString()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  id: string;

  @IsDateString()
  @IsOptional()
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  dateOfBirth: string;

  @ValidateNested()
  @Type(() => NameDto)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  name: NameDto;

  @IsString()
  @Expose()
  @ApiProperty()
  @IsOptional()
  @ApiResponseProperty()
  gender: string;

  @ValidateNested()
  @Type(() => ContactDto)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  @IsOptional()
  contact: ContactDto;

  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  @Expose()
  @ApiProperty()
  @ApiResponseProperty()
  @IsOptional()
  documents: DocumentDto[];
}

export class GetFlightOffersDto {
  @ApiProperty()
  @IsString()
  originLocationCode: string;

  @ApiProperty()
  @IsString()
  destinationLocationCode: string;

  @IsISO8601({ strict: true })
  @ApiProperty()
  @IsString()
  departureDate: string;

  @Max(9)
  @IsInt()
  @ApiProperty()
  @IsNumber()
  adults: number;
}

export class FlightOffersSerialize {
  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightOfferDto)
  @ApiProperty()
  @ApiResponseProperty()
  data: FlightOfferDto[];

  @Expose()
  @ValidateNested()
  @Type(() => Dictionaries)
  @ApiProperty()
  @ApiResponseProperty()
  dictionaries: Dictionaries;
}

export class GetFlightOfferPriceDto {
  @Expose()
  @ValidateNested()
  @Type(() => FlightOfferDto)
  @ApiProperty()
  @IsObject()
  @ApiResponseProperty()
  flightOffer: FlightOfferDto;
}

export class FlightOfferPriceSerialize extends PickType(
  GetFlightOfferPriceDto,
  ['flightOffer'],
) {}

export class CreateFlightOrderDto extends PickType(GetFlightOfferPriceDto, [
  'flightOffer',
]) {
  @Expose()
  @Type(() => TravelerDto)
  @ValidateNested({ each: true })
  @ApiProperty()
  @IsArray()
  travelers: TravelerDto[];
}

export class FlightOrderSerialize {
  @Expose()
  @IsString()
  @ApiResponseProperty()
  id: string;
}
