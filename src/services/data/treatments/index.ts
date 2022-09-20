import { TaskStatusesEnum, TreatmentStagesEnum, TreatmentTypesEnum, WeatherEnum } from '..';

export interface TreatmentModel {
  id?: number;
  temperature?: number;
  threatmentStage?: TreatmentStagesEnum;
  stageConcentration?: string;
  firstTitle?: string;
  liquidType?: string;
  percent?: number;
  secondTitle?: string;
  status?: TaskStatusesEnum;
  treatmentType?: TreatmentTypesEnum;
  isSigned?: boolean;
  signedPosition?: string;
  signedFIO?: string;
  weatherType?: WeatherEnum;
  treatmentCompleted?: boolean;
  treatmentIsChecked?: boolean;
  images?: TreatmentImage[];
  spentWater?: number;
  spentLiquidOne?: number;
  spentLiquidFour?: number;
  treatmentCar?: string;
  checkedDate?: string;
  codePassed?: boolean;
}

export interface TreatmentImage {
  id?: number;
  url: string;
  comment: string;
}

export interface GetDeicingTreatmentByIdRequestParams {
  treatmentId: number;
  cityId: number;
}

export interface UpdateDeicingTreatmentRequestBody {
  id?: number;
  threatmentStage?: TreatmentStagesEnum;
  stageConcentration?: string;
  firstTitle?: string;
  liquidType?: string;
  percent?: number;
  secondTitle?: string;
  isSigned?: boolean;
  treatmentType?: TreatmentTypesEnum;
  signedPosition?: string;
  signedFIO?: string;
  weatherType?: WeatherEnum;
  status?: TaskStatusesEnum;
  treatmentCompleted?: boolean;
  treatmentIsChecked?: boolean;
  images?: TreatmentImage[];
  spentWater?: number;
  spentLiquidOne?: number;
  spentLiquidFour?: number;
  editReason?: string;
  checkedDate?: string;
  codePassed?: boolean;
  signImage?: string;
}

export interface StartDeicingTreatmentRequestBody {
  treatmentId: number;
}

export interface SaveDeicingTreatmentSignRequestBody {
  treatmentId: number;
  signedPositionName: string;
  signedFullName: string;
  url: string;
}
