import { MaintanceTypesEnum } from '../../services/data';
import {
  AuthStackScreens,
  FeedbackStackScreens,
  TenderStackScreens,
  NotificationsStackScreens,
  PhotofixationStackScreens,
  PooStackScreens,
  TasksStackScreens,
  FlightsStackScreens,
  UpdateApp,
} from '../enums';
import { DocumentView, Flight } from '../../typings/swagger/api';

export type TasksStackParamList = {
  [TasksStackScreens.PooEnterTransportNumber]: undefined;
  [TasksStackScreens.Tasks]: undefined;
  [TasksStackScreens.TasksSearch]: undefined;
  [TasksStackScreens.TaskConfirmed]: {
    data: DocumentView;
  };
  [TasksStackScreens.TaskDetails]: {
    id: number;
    numberOfFlight: string;
  };
  [TasksStackScreens.TaskInProgress]: {
    id: number;
    numberOfFlight: string;
  };
  [TasksStackScreens.Maintenance]: {
    type: MaintanceTypesEnum;
  };
  [TasksStackScreens.TaskReport]: {
    id: number;
  };
  [TasksStackScreens.TaskReportSign]: {
    id: number;
  };
};

export type FlightsStackParamList = {
  [FlightsStackScreens.Flights]: undefined;
  [FlightsStackScreens.FlightsSearch]: undefined;
  [FlightsStackScreens.FlightDetailsScreen]: {
    data: Flight;
  };
};

export type TenderStackParamList = {
  [TenderStackScreens.HeatingTender]: {
    data: DocumentView;
  };
  [TenderStackScreens.ToiletTender]: {
    data: DocumentView;
  };
  [TenderStackScreens.ProvisioningMinibus]: {
    data: DocumentView;
  };
  [TenderStackScreens.WaterSystemMaintenance]: {
    data: DocumentView;
  };
  [TenderStackScreens.AircraftCooling]: {
    data: DocumentView;
  };
  [TenderStackScreens.AnyService]: {
    data: DocumentView;
  };
  [TenderStackScreens.ProvidingAirLaunchDevice]: {
    data: DocumentView;
  };
  [TenderStackScreens.DriverProviding]: {
    data: DocumentView;
  };
  [TenderStackScreens.ProvidingAnExtensionCord]: {
    data: DocumentView;
  };
  [TenderStackScreens.ProvisionOfProcessWater]: {
    data: DocumentView;
  };
  [TenderStackScreens.SanitaryInspection]: {
    data: DocumentView;
  };
  [TenderStackScreens.TieDownStrapsAndNetsRent]: {
    data: DocumentView;
  };
  [TenderStackScreens.Outstaffing]: {
    data: DocumentView;
  };
  [TenderStackScreens.ProvisionOfBaggageCar]: {
    data: DocumentView;
  };
  [TenderStackScreens.DrainContainer]: {
    data: DocumentView;
  };
  [TenderStackScreens.ProvisioningEscortVehicle]: {
    data: DocumentView;
  };
  [TenderStackScreens.GroundPowerUnit]: {
    data: DocumentView;
  };
  [TenderStackScreens.LaddersProvision]: {
    data: DocumentView;
  };
  [TenderStackScreens.CompressedGas]: {
    data: DocumentView;
  };
  [TenderStackScreens.MaintenanceKit]: {
    data: DocumentView;
  };
};

export type NotificationsStackParamList = {
  [NotificationsStackScreens.Notifications]: undefined;
  [NotificationsStackScreens.NotificationDetails]: {
    id: number;
  };
};

export type FeedbackStackParamList = {
  [FeedbackStackScreens.Feedback]: undefined;
};

export type UpdateAppParamList = {
  [UpdateApp.Update]: undefined;
};

export type PhotofixationStackParamList = {
  [PhotofixationStackScreens.Photofixation]: undefined;
};

export type PooStackParamList = {
  [PooStackScreens.PooAgent]: {
    id: number;
    updateAfterDone?: boolean;
  };
  [PooStackScreens.PooSign]: {
    id: number;
  };
  [PooStackScreens.PooEnterTransportNumber]: undefined;
  [PooStackScreens.PooTransportEmployee]: {
    numberOfFlight: string;
    deicingTreatmentId: number;
  };
  [PooStackScreens.PooAgentResults]: {
    numberOfFlight: string;
    id: number;
  };
  [PooStackScreens.PooUpdateReason]: {
    id: number;
  };
  [PooStackScreens.PooAgentResultsNext]: undefined;
  [PooStackScreens.PooCode]: undefined;
};

export type AuthStackParamList = {
  [AuthStackScreens.Login]: {
    token?: string;
  };
  [AuthStackScreens.Phone]: undefined;
  [AuthStackScreens.PinCode]: {
    navigateTo: string;
  };
  [AuthStackScreens.PasswordReset]: undefined;
  [AuthStackScreens.NewPassword]: undefined;
};
