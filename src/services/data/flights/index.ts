import { DirectionsEnum, TaskStatusesEnum } from '..';

export interface FlightModel {
  id?: number;
  title?: string;
  numberOfFlight?: string;
  fullNumberOfFlight?: string;
  direction?: DirectionsEnum;
  status?: TaskStatusesEnum;
  parkingNumber?: string | number;
  flightDate?: string;
  airplane?: string;
  airplaneType?: string;
  tkoDirection?: DirectionsEnum;
  isCanceled?: boolean;
  serviceFlight?: boolean;
  isSpecialTariff?: boolean;
  delay: number;
  durationRPP: number;
  fuelTakeOff: number;
  fuelTaxi: number;
  fuelSum: number;
  delayTime?: string;
  std?: string;
  etd?: string;
  atd?: string;
  eta?: string;
  ata?: string;
  flightStatus?: string;
  flightCategory?: string;
  flightType?: string;
  departureAirport?: string;
  exit?: string;
  cargoFact?: string;
  cargoAO?: string;
  afterEdit?: string;
  parkingPowerSupply?: string;
  parkingGrounding?: string;
  parkingRegion?: string;
  passiveFact?: string;
  passiveAODB?: string;
  platform?: null;
  terminal?: null;
  ms?: string;
  route?: string;
  sta?: string;
  startPlan?: string;
}

export interface GetTendersListRequestParams {
  id?: number;
  search?: string;
}

export interface GetServicesByFlightIdRequestParams {
  id: number;
}

export interface AcceptFlightRequestParams {
  flightId: number;
  userId: number;
}
