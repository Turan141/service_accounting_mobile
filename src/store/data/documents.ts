import { DocumentItemDto, PropertyView } from '../../typings/swagger/api';
import { TaskStatusesEnum } from '../../services/data';
import ProvisionOfBaggageCarReport from '../../screens/serviceTenders/ProvisionOfBaggageCar/ProvisionOfBaggageCarReport';

export enum DocumentItemNamesEnum {
  ForcedDownTime = 'forcedDownTime',
  GarageNumberOfSpecialEquipment = 'garageNumberOfSpecialEquipment',
  HeatingPoint = 'heatingPoint',
  CustomerSign = 'customerSign',
  ToiletType = 'lavatory',
  ProvisioningMinibuses = 'provisioningminibuses',
  WaterSystemMaintenance = 'watersystemmaintenance',
  AircraftCooling = 'aircraftcooling',
  AnyServiceFlight = 'anyServiceFlight',
  ProvidingAirLaunchDevice = 'ProvidingAirLaunchDevice',
  SanitaryInspection = 'sanitaryInspection',
  DriverProviding = 'DriverProviding',
  ProvisionOfProcessWater = 'ProvisionOfProcessWater',
  ProvidingAnExtensionCord = 'ProvidingAnExtensionCord',
  TieDownStrapsAndNetsRent = 'tiedownstraps',
  Outstaffing = 'personnelforadditionalwork',
  ProvisionOfBaggageCar = 'provisionofspecialmachinery',
  DrainContainer = 'draincontainer',
  ProvisioningEscortVehicle = 'provisioningescortvehicle',
  GroundPowerUnit = 'groundpowerunit',
  LaddersProvision = 'laddersprovision',
  CompressedGas = 'refuelingwithcompressedgas',
  MaintenanceKit = 'maintancekit',
}

export interface AddPositionsToTenderProps {
  items?: DocumentItemDto[];
  status?: TaskStatusesEnum;
  properties?: PropertyView[];
}

export interface EditItemProps {
  itemType?: DocumentItemNamesEnum;
  id?: number;
  additionalInfo?: string;
  properties?: Record<string, string>;
  referenceMasterCode?: string;
  masterCode?: string;
}

export enum AllowedBlobTypesEnum {
  ImageJPG = 'image/jpeg',
  ImagePNG = 'image/png',
}
