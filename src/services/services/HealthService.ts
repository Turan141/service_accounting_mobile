import { GET, PUT } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import { ResponseSuccessOfDocumentView } from '../../typings/swagger/api';
import { DocumentsEndpoints, EditPositionsOfDocumentProps } from '../documents/DocumentsService';
// import {
//   ApiRequestResponse,
//   GetImagesRequestParams,
//   GetServicesByFlightIdRequestParams,
//   PhotofixationImage,
//   ServiceModel,
// } from '../data';

// enum ServicesEndpoints {
//   GetByFlightId = 'GetServicesByFlightId',
//   GetImages = 'GetImages',
// }

export class HealthService extends BaseService {
  basePath = '/clients/Health/';

  checkHealth = async (
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<ResponseSuccessOfDocumentView> => {
    const response: any = await this.send(GET, '', '', { ...options }, requestOptions);
    return response;
  };

  // getByFlightId = async (
  //   params: GetServicesByFlightIdRequestParams,
  //   options: RequestInit = {},
  //   requestOptions: RestServiceRequestOptions = {}
  // ): Promise<ServiceModel[]> => {
  //   const { result }: ApiRequestResponse<ServiceModel> = await this.send(
  //     GET,
  //     `id=${params.id}`,
  //     ServicesEndpoints.GetByFlightId,
  //     options,
  //     requestOptions
  //   );
  //
  //   return result;
  // };
  //
  // getImages = async (
  //   params: GetImagesRequestParams,
  //   options: RequestInit = {},
  //   requestOptions: RestServiceRequestOptions = {}
  // ): Promise<PhotofixationImage[]> => {
  //   const data = await this.send(
  //     GET,
  //     `Take=${params.take}&Skip=${params.skip}`,
  //     ServicesEndpoints.GetImages,
  //     options,
  //     requestOptions
  //   );
  //
  //   return data;
  // };
}

const healthService = new HealthService();

export default healthService;
