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
import { Type } from 'class-transformer';

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
  originDestinationId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  flightOfferIds: string[];
}

class CollectionLinksDTO {
  @IsUrl()
  @IsOptional()
  self: string;

  @IsUrl()
  @IsOptional()
  next: string;

  @IsUrl()
  @IsOptional()
  previous: string;

  @IsUrl()
  @IsOptional()
  last: string;

  @IsUrl()
  @IsOptional()
  first: string;

  @IsUrl()
  @IsOptional()
  up: string;
}

class LocationValue {
  cityCode: string;
  countryCode: string;
}

class AircraftEquipment {
  @IsString()
  @Matches(/[a-zA-Z0-9]{3}/)
  code: string;
}

class OperatingFlight {
  @IsString()
  @MinLength(1)
  @MaxLength(2)
  carrierCode: string;
}

class FlightEndPoint {
  @IsString()
  iataCode: string;

  @IsOptional()
  @IsString()
  terminal?: string;

  @IsISO8601()
  at: string;
}

class FlightStop {
  @IsString()
  iataCode: string;

  @IsString()
  duration: string;

  @IsISO8601()
  arrivalAt: string;

  @IsISO8601()
  departureAt: string;
}

class Fee {
  @IsString()
  amount: string;

  @IsEnum(FeeType)
  type: FeeType;
}

class Tax {
  @IsString()
  amount: string;

  @IsString()
  code: string;
}

class Price {
  @IsString()
  currency: string;

  @IsString()
  total: string;

  @IsString()
  base: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Fee)
  fees: Fee[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tax)
  taxes: Tax[];

  @IsString()
  refundableTaxes: string;
}

class CollectionMeta {
  @IsInt()
  count: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OneWayCombinationsDTO)
  oneWayCombinations: OneWayCombinationsDTO[];

  @IsOptional()
  @Type(() => CollectionLinksDTO)
  links?: CollectionLinksDTO;
}

class LocationEntry {
  @IsString()
  key: string;

  @ValidateNested()
  @Type(() => LocationValue)
  value: LocationValue;
}

class AircraftEntry {
  @IsString()
  key: string;

  @IsString()
  value: string; // Manufacturer/model of aircraft
}

class CurrencyEntry {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class CarrierEntry {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

class FlightSegment {
  @ValidateNested()
  @Type(() => FlightEndPoint)
  departure: FlightEndPoint;

  @ValidateNested()
  @Type(() => FlightEndPoint)
  arrival: FlightEndPoint;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  carrierCode: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  number: string;

  @ValidateNested()
  @Type(() => AircraftEquipment)
  aircraft: AircraftEquipment;

  @ValidateNested()
  @Type(() => OperatingFlight)
  operating: OperatingFlight;

  @IsString()
  duration: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightStop)
  stops: FlightStop[];
}

class OriginalFlightEndPoint {
  @IsString()
  iataCode: string;

  @IsString()
  terminal: string;
}

class OriginalFlightStop {
  @IsString()
  iataCode: string;

  @IsString()
  duration: string;
}

class PriceDetails {
  @IsString()
  currency: string;

  @IsString()
  total: string;

  @IsString()
  base: string;

  @IsOptional()
  @IsString()
  margin?: string;

  @IsString()
  grandTotal: string;

  @IsOptional()
  @IsString()
  billingCurrency?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdditionalService)
  additionalServices?: AdditionalService[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Fee)
  fees: Fee[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Tax)
  taxes?: Tax[];

  @IsOptional()
  @IsString()
  refundableTaxes?: string;
}

class AdditionalService {
  @IsString()
  type: string; // Assuming there's a predefined list of types that can be turned into an enum if needed
}

class Co2Emission {
  @IsInt()
  weight: number;

  @IsString()
  weightUnit: string;

  @IsEnum(TravelClass)
  cabin: TravelClass;
}

class DateTimeRange {
  @IsDateString()
  date: string;

  @IsString()
  time: string;

  @IsOptional()
  @IsString()
  dateWindow?: string;

  @IsOptional()
  @IsString()
  timeWindow?: string;
}

class OriginDestination {
  @IsString()
  id: string;

  @IsString()
  originLocationCode: string;

  @IsString()
  destinationLocationCode: string;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  includedConnectionPoints?: string[];

  @IsOptional()
  @IsArray()
  @Type(() => String)
  excludedConnectionPoints?: string[];

  @IsOptional()
  @IsNumber()
  originRadius?: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  alternativeOriginsCodes?: string[];

  @IsOptional()
  @IsNumber()
  destinationRadius?: number;

  @IsOptional()
  @IsArray()
  @Type(() => String)
  alternativeDestinationsCodes?: string[];

  @ValidateNested()
  @Type(() => DateTimeRange)
  departureDateTimeRange: DateTimeRange;

  @ValidateNested()
  @Type(() => DateTimeRange)
  arrivalDateTimeRange: DateTimeRange;
}

class TravelerInfo {
  @IsString()
  id: string;

  @IsEnum(TravelClass)
  travelerType: TravelClass;

  @IsString()
  associatedAdultId: string;
}

class CarrierRestrictions {
  @IsBoolean()
  blacklistedInEUAllowed: boolean;

  @IsArray()
  @Type(() => String)
  excludedCarrierCodes: string[];

  @IsArray()
  @Type(() => String)
  includedCarrierCodes: string[];
}

class ConnectionRestriction {
  @IsInt()
  @Min(0)
  @Max(2)
  maxNumberOfConnections: number;

  @IsBoolean()
  nonStopPreferred: boolean;

  @IsBoolean()
  airportChangeAllowed: boolean;

  @IsBoolean()
  technicalStopsAllowed: boolean;
}

class FlightFilters {
  @IsOptional()
  @IsBoolean()
  crossBorderAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  moreOvernightsAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  returnToDepartureAirport?: boolean;

  @IsOptional()
  @IsBoolean()
  railSegmentAllowed?: boolean;

  @IsOptional()
  @IsBoolean()
  busSegmentAllowed?: boolean;

  @IsOptional()
  @IsNumber()
  maxFlightTime?: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CarrierRestrictions)
  carrierRestrictions?: CarrierRestrictions;

  @ValidateNested({ each: true })
  @Type(() => CabinRestriction)
  cabinRestrictions: CabinRestriction[];

  @IsOptional()
  @ValidateNested()
  @Type(() => ConnectionRestriction)
  connectionRestriction?: ConnectionRestriction;
}

class SearchCriteria {
  @IsOptional()
  @IsBoolean()
  excludeAllotments?: boolean;

  @IsOptional()
  @IsBoolean()
  addOneWayOffers?: boolean;

  @IsInt()
  maxFlightOffers: number;

  @IsOptional()
  @IsInt()
  maxPrice?: number;

  @IsOptional()
  @IsBoolean()
  allowAlternativeFareOptions?: boolean;

  @IsOptional()
  @IsBoolean()
  oneFlightOfferPerDay?: boolean;

  @ValidateNested()
  @Type(() => FlightFilters)
  @IsObject()
  flightFilters: FlightFilters;
}

enum Coverage {
  MOST_SEGMENTS = 'MOST_SEGMENTS',
  AT_LEAST_ONE_SEGMENT = 'AT_LEAST_ONE_SEGMENT',
  ALL_SEGMENTS = 'ALL_SEGMENTS',
}

class CabinRestriction {
  @IsEnum(TravelClass)
  cabin: TravelClass;

  @IsArray()
  @Type(() => String)
  originDestinationIds: string[];

  @IsEnum(Coverage)
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
  fareType: FareType[];

  @IsOptional()
  @IsBoolean()
  includedCheckedBagsOnly?: boolean;

  @IsOptional()
  @IsBoolean()
  refundableFare?: boolean;

  @IsOptional()
  @IsBoolean()
  noRestrictionFare?: boolean;

  @IsOptional()
  @IsBoolean()
  noPenaltyFare?: boolean;
}

export class FlightOfferDto {
  @IsString()
  type: string;

  @IsString()
  id: string;

  @IsEnum(FlightOfferSource)
  source: FlightOfferSource;

  @IsBoolean()
  instantTicketingRequired: boolean;

  @IsOptional()
  @IsBoolean()
  disablePricing?: boolean;

  @IsBoolean()
  nonHomogeneous: boolean;

  @IsOptional()
  @IsBoolean()
  oneWay?: boolean;

  @IsOptional()
  @IsBoolean()
  isUpsellOffer?: boolean;

  @IsOptional()
  @IsBoolean()
  paymentCardRequired?: boolean;

  @IsString()
  lastTicketingDate: string;

  @IsOptional()
  @IsISO8601()
  lastTicketingDateTime?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(9)
  numberOfBookableSeats?: number;

  @ValidateNested()
  @Type(() => PriceDetails)
  price: PriceDetails;

  @ValidateNested()
  @Type(() => Itinerary)
  itineraries: Itinerary[];

  @ValidateNested()
  @Type(() => PricingOptions)
  pricingOptions: PricingOptions;

  @IsArray()
  @Type(() => String)
  validatingAirlineCodes: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TravelerPricingDTO)
  travelerPricings: TravelerPricingDTO[];
}

class Segment {
  @IsString()
  id: string;

  @IsInt()
  numberOfStops: number;

  @IsOptional()
  @IsBoolean()
  blacklistedInEU?: boolean;

  @ValidateNested({ each: true })
  @Type(() => Co2Emission)
  co2Emissions: Co2Emission[];

  @ValidateNested()
  @Type(() => FlightEndPoint)
  departure: FlightEndPoint;

  @ValidateNested()
  @Type(() => FlightEndPoint)
  arrival: FlightEndPoint;

  @IsString()
  @MinLength(1)
  @MaxLength(2)
  carrierCode: string;

  @IsString()
  @MinLength(1)
  @MaxLength(4)
  number: string;

  @ValidateNested()
  @Type(() => AircraftEquipment)
  aircraft: AircraftEquipment;

  @ValidateNested()
  @Type(() => OperatingFlight)
  operating: OperatingFlight;

  @IsString()
  duration: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FlightStop)
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
  id: string;

  @IsEnum(TravelerType)
  travelerType: TravelerType;

  @IsOptional()
  @IsString()
  associatedAdultId: string;
}

class AdditionalInformationDTO {
  @IsBoolean()
  chargeableCheckedBags: boolean;

  @IsBoolean()
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
  currency: string;

  @IsString()
  @IsNotEmpty()
  total: string;

  @IsString()
  @IsNotEmpty()
  base: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FeeDTO)
  fees?: FeeDTO[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaxDTO)
  taxes?: TaxDTO[];

  @IsString()
  @IsOptional()
  refundableTaxes?: string;
}

class FeeDTO {
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsEnum(FeeType)
  type: FeeType;
}

class TaxDTO {
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  code: string;
}

class BaggageAllowanceDTO {
  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  quantity?: number;

  @IsInt()
  @IsOptional()
  weight?: number;

  @IsString()
  @IsOptional()
  weightUnit?: string;
}

class AllotmentDetailsDTO {
  @IsString()
  @IsOptional()
  tourName?: string;

  @IsString()
  @IsOptional()
  tourReference?: string;
}

class ChargeableCheckdBagsDTO {
  @IsInt()
  quantity: number;

  @IsInt()
  weight: number;

  @IsString()
  weightUnit: string;

  @IsString()
  id: string;
}

class ChargeableSeatDTO {
  @IsString()
  id: string;

  @Matches(/^[1-9][0-9]{0,2}[A-Z]?$/)
  number: string;
}

class AdditionalServicesRequestDTO {
  @ValidateNested()
  @Type(() => ChargeableCheckdBagsDTO)
  chargeableCheckedBags?: ChargeableCheckdBagsDTO;

  @ValidateNested()
  @Type(() => ChargeableSeatDTO)
  chargeableSeat?: ChargeableSeatDTO;

  @Matches(/^[1-9][0-9]{0,2}[A-Z]?$/)
  @IsOptional()
  chargeableSeatNumber?: string;

  @IsArray()
  @IsEnum(ServiceName, { each: true })
  otherServices?: ServiceName[];
}

class FareDetailsBySegmentDTO {
  @IsString()
  @IsNotEmpty()
  segmentId: string;

  @IsEnum(TravelClass)
  cabin: TravelClass;

  @Matches(/^[A-Z0-9]{1,18}$/)
  fareBasis: string;

  @IsString()
  @IsOptional()
  brandedFare?: string;

  @Matches(/^[A-Z]{1}$/)
  class: string;

  @IsOptional()
  @IsBoolean()
  isAllotment?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => AllotmentDetailsDTO)
  allotmentDetails?: AllotmentDetailsDTO;

  @IsEnum(SliceDiceIndicator)
  @IsOptional()
  sliceDiceIndicator?: SliceDiceIndicator;

  @ValidateNested()
  @Type(() => BaggageAllowanceDTO)
  includedCheckedBags?: BaggageAllowanceDTO;

  @IsOptional()
  @ValidateNested()
  @Type(() => AdditionalServicesRequestDTO)
  additionalServices?: AdditionalServicesRequestDTO;
}

class TravelerPricingDTO {
  @IsString()
  @IsNotEmpty()
  travelerId: string;

  @IsEnum(TravelerPricingFareOption)
  fareOption: TravelerPricingFareOption;

  @IsEnum(TravelerType)
  travelerType: TravelerType;

  @IsString()
  @IsOptional()
  associatedAdultId?: string;

  @ValidateNested()
  @Type(() => PriceDTO)
  price: PriceDTO;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FareDetailsBySegmentDTO)
  fareDetailsBySegment: FareDetailsBySegmentDTO[];
}

class Itinerary {
  @IsOptional()
  @IsString()
  duration?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(250)
  @ValidateNested({ each: true })
  @Type(() => Segment)
  segments: Segment[];
}

class Dictionaries {
  @ValidateNested()
  @Type(() => LocationEntry)
  locations: LocationEntry[];

  @ValidateNested()
  @Type(() => AircraftEntry)
  aircraft: AircraftEntry[];

  @ValidateNested()
  @Type(() => CurrencyEntry)
  currencies: CurrencyEntry[];

  @ValidateNested()
  @Type(() => CarrierEntry)
  carriers: CarrierEntry[];
}

class NameDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

// Phone DTO
class PhoneDto {
  @IsString()
  deviceType: string;

  @IsString()
  countryCallingCode: string;

  @IsString()
  number: string;
}

// Contact DTO
class ContactDto {
  @IsString()
  emailAddress: string;

  @ValidateNested({ each: true })
  @Type(() => PhoneDto)
  phones: PhoneDto[];
}

// Document DTO
class DocumentDto {
  @IsString()
  documentType: string;

  @IsString()
  birthPlace: string;

  @IsString()
  issuanceLocation: string;

  @IsString()
  issuanceDate: string;

  @IsString()
  number: string;

  @IsString()
  expiryDate: string;

  @IsString()
  issuanceCountry: string;

  @IsString()
  validityCountry: string;

  @IsString()
  nationality: string;

  @IsBoolean()
  holder: boolean;
}

class TravelerDto {
  @IsNumberString()
  id: string;

  @IsDateString()
  dateOfBirth: string;

  @ValidateNested()
  @Type(() => NameDto)
  name: NameDto;

  @IsString()
  gender: string;

  @ValidateNested()
  @Type(() => ContactDto)
  contact: ContactDto;

  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  documents: DocumentDto[];
}

export class GetFlightOffersDto {
  @IsString()
  currencyCode: string;

  @ValidateNested({ each: true })
  @Type(() => OriginDestination)
  originDestinations: OriginDestination[];

  @ValidateNested({ each: true })
  @Type(() => Extended_TravelerInfo)
  travelers: Extended_TravelerInfo[];

  @IsArray()
  @Type(() => String)
  sources: string[];

  @ValidateNested()
  @Type(() => SearchCriteria)
  searchCriteria: SearchCriteria;
}

export class GetFlightOfferPriceDto {
  @Type(() => FlightOfferDto)
  @ValidateNested()
  @IsArray()
  flightOffers: FlightOfferDto[];
}

export class CreateFlightOrder {
  @ValidateNested({ each: true })
  @Type(() => FlightOfferDto)
  @IsArray()
  flightOffers: FlightOfferDto[];

  @ValidateNested({ each: true })
  @Type(() => TravelerDto)
  @IsArray()
  travelers: TravelerDto[];
}
