import { GET, POST, PUT } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import {
  ApiRequestResponse,
  FlightModel,
  GetDeicingTreatmentByIdRequestParams,
  SaveDeicingTreatmentSignRequestBody,
  StartDeicingTreatmentRequestBody,
  TreatmentModel,
  UpdateDeicingTreatmentRequestBody,
} from '../data';

enum TreatmentsEndpoints {
  GetDeicingTreatments = 'GetDeicingTreatments',
  GetById = 'GetDeIcingTreatmentById',
  UpdateDeicingTreatment = 'UpdateDeicingTreatment',
  StartDeicingTreatment = 'StartDeicingTreatment',
  StopDeicingTreatment = 'StopDeicingTreatment',
  SaveSign = 'SignedDeicingTreatment',
}

export class TreatmentsService extends BaseService {
  basePath = '/clients/Treatment/';

  getDeicingTreatments = async (
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<FlightModel[]> => {
    const data: ApiRequestResponse<FlightModel> = await this.send(
      GET,
      '',
      TreatmentsEndpoints.GetDeicingTreatments,
      options,
      requestOptions
    );

    return data.result;
  };

  getById = async (
    params: GetDeicingTreatmentByIdRequestParams,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<TreatmentModel> => {
    const data: TreatmentModel = await this.send(
      GET,
      `TreatmentId=${params.treatmentId}&CityId=${params.cityId}`,
      TreatmentsEndpoints.GetById,
      options,
      requestOptions
    );

    return data;
  };

  updateDeicingTreatment = async (
    body: UpdateDeicingTreatmentRequestBody,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<TreatmentModel> => {
    const data = await this.send(
      PUT,
      '',
      TreatmentsEndpoints.UpdateDeicingTreatment,
      { ...options, body: JSON.stringify(body) },
      requestOptions
    );

    console.log({
      data,
    });

    return data;
  };

  startDeicingTreatment = async (
    body: StartDeicingTreatmentRequestBody,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<void> => {
    await this.send(
      POST,
      '',
      TreatmentsEndpoints.StartDeicingTreatment,
      { ...options, body: JSON.stringify(body) },
      requestOptions
    );
  };

  stopDeicingTreatment = async (
    body: StartDeicingTreatmentRequestBody,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<void> => {
    await this.send(
      POST,
      '',
      TreatmentsEndpoints.StopDeicingTreatment,
      { ...options, body: JSON.stringify(body) },
      requestOptions
    );
  };

  saveSign = async (
    body: SaveDeicingTreatmentSignRequestBody,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<void> => {
    await this.send(POST, '', TreatmentsEndpoints.SaveSign, { ...options, body: JSON.stringify(body) }, requestOptions);
  };
}

const treatmentsService = new TreatmentsService();

export default treatmentsService;
