import { POST } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import { ApiRequestResponse, TenderTypesEnum } from '../data';
import { DocumentItemView, RequestPaginationReference } from '../../typings/swagger/api';
import { DocumentsEndpoints } from '../documents/DocumentsService';

export type DictionaryType = 'AircraftParkings' | 'AircraftsType' | 'Transports' | 'PassengerCategories';

export class DictionariesService extends BaseService {
  basePath = '/clients/References/';

  getDictionaryItemsByType = async (
    data: RequestPaginationReference,
    dictionaryType: DictionaryType | TenderTypesEnum,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<DocumentItemView[]> => {
    const response: ApiRequestResponse<DocumentItemView> = await this.send(
      POST,
      '',
      dictionaryType + DocumentsEndpoints.Find,
      { ...options, body: JSON.stringify(data) },
      requestOptions
    );
    return response.result.items;
  };
}

const dictionariesService = new DictionariesService();

export default dictionariesService;
