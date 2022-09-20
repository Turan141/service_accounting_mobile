import { DirectionsEnum, TaskStatusesEnum, TaskTypesEnum, TreatmentImage } from '..';

export interface ServiceModel {
  id?: number;
  number?: number;
  title?: string;
  startTime?: string;
  endTime?: string;
  status?: TaskStatusesEnum;
  count?: number;
  comment?: string;
  responsible?: string;
  isCompleted?: boolean;
  direction?: DirectionsEnum;
  taskType: TaskTypesEnum;
  isService?: boolean;
}

export interface GetImagesRequestParams {
  skip?: number;
  take?: number;
}

export interface PhotofixationImage {
  images?: TreatmentImage[];
  dateTime?: string;
}
