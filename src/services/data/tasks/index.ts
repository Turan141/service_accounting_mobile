export type TaskTypes = 'ppo' | 'towing';
export type TaskStatuses = 'pending' | 'in_progress';

export type TaskSchema = {
  id?: number;
  title?: string;
  time?: string;
  location?: string;
  signDetails?: string;
  type?: TaskTypes;
  customer?: string;
  airline?: string;
  workStartDate?: string;
  additionalInfo?: string;
  borderNumber?: string;
  flight?: string;
  route?: TaskRouteSchema;
  staEta?: string;
  date?: string;
  aircraftType?: string;
  board?: string;
  mc?: number;
  arrival?: string;
  parking?: string;
  platform?: string;
  terminal?: string;
  exit?: string;
  passFact?: string;
  passAodb?: string;
  luggageFact?: string;
  luggageAodb?: string;
  status?: TaskStatuses;
};

export interface TaskGetByIdParams {
  id: number;
}

export enum TaskStatusesEnum {
  New = 'new',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
  ConfirmedPerformer = 'confirmedPerformer',
  Started = 'started',
  CompletedWithoutSignature = 'completedWithoutSignature',
  Completed = 'completed',
}

export type TaskStepSchema = {
  order: number;
  label: string;
  key: string;
  disabled: boolean;
  visited?: boolean;
};

export type TaskRouteSchema = {
  from?: string;
  to?: string;
};

export enum MaintanceTypesEnum {
  CargoMail = 'cargoMail',
  Towing = 'towing',
  PowerSupply = 'powerSupply',
  Passengers = 'passengers',
  BathroomService = 'bathroomService',
  Luggage = 'luggage',
  Ladder = 'ladder',
  Refueling = 'refueling',
  VisualInspection = 'visualInspection',
  Cooling = 'cooling',
  Heating = 'heating',
  UVZ = 'uvz',
  Oxygen = 'oxygen',
  Nitrogen = 'nitrogen',
  FuelDraining = 'fuelDraining',
}

export enum TenderTypesEnum {
  Heating = '70',
  Toilet = '75',
  ProvisioningMinibus = '71',
  WaterSystemMaintenance = '80',
  AircraftCooling = '73',
  AnyService = 'anyService',
  ProvidingAirLaunchDevice = '74',
  SanitaryInspection = '76',
  DriverProviding = '77',
  ProvisionOfProcessWater = '78',
  ProvidingAnExtensionCord = '79',
  TieDownStrapsAndNetsRent = '88',
  Outstaffing = '85',
  ProvisionOfBaggageCar = '84',
  DrainContainer = '82',
  ProvisioningEscortVehicle = '83',
  GroundPowerUnit = '81',
  LaddersProvision = '72',
  CompressedGas = '89',
  MaintenanceKit = '86',
}
