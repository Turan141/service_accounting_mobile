import { DELETE, GET, POST, PUT } from '../../utils';
import BaseService, { RestServiceRequestOptions } from '../BaseService';
import { ApiRequestResponse, TaskStatusesEnum } from '../data';
import {
  DocumentView,
  RequestPaginationOfDocumentFilter,
  DocumentItemView,
  DocumentItemDto,
  ResponseSuccessOfDocumentView,
} from '../../typings/swagger/api';
import { GetDocumentByIdProps } from '../data/documents';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { logToConsole } from '../../utils/formatting';
import { rootStore } from '../../store/RootStore';
import isIP from '../../utils/http/isIp';
import { fetch as origFetch, ReactNativeSSLPinning } from 'react-native-ssl-pinning';

export enum DocumentsEndpoints {
  Find = '/Find',
  status = '/status',
  GetById = '/GetById/',
  Items = '/Items/',
  Properties = '/Properties',
  Attachments = '/Attachments',
}

export enum ReferenceCodesOfServicesEnum {
  Heating = '70',
  Lavatory = '75',
  ProvisioningMinibus = '71',
  WaterSystemMaintenance = '80',
  AircraftCooling = '73',
}

export type DocumentType = 'Requests';

export interface DocumentServiceProps {
  documentType?: DocumentType;
  documentId?: number;
  items?: DocumentItemDto[];
  status?: TaskStatusesEnum;
  itemId?: number;
  itemIds?: number[];
}

export interface FinishTenderProps {
  additionalInfo: string;
  customerComments: string;
  position: string;
  fullName: string;
  signature: string;
  isCustomerSignExists: boolean;
  isTenderSignCancelled: boolean;
}

export interface AddAttachmentToItemProps {
  attachment: string;
  documentType: DocumentType;
  documentId: number;
  itemId: number;
}

export interface EditPositionsOfDocumentProps {
  additionalInfo?: string;
  documentType?: DocumentType;
  documentId?: number;
  properties?: Record<string, string>;
  itemId?: number;
  referenceMasterCode?: string;
  status?: TaskStatusesEnum;
}

const fetch = (url, options) => {
  return origFetch(url, {
    ...options,
    ...(isIP(url) && {
      sslPinning: {
        certs: ['ca'],
      },
    }),
    disableAllSecurity: !isIP(url),
    timeoutInterval: 10000,
  });
};

export class DocumentsService extends BaseService {
  basePath = '/clients/Documents/';

  getDocumentsListByType = async (
    data: RequestPaginationOfDocumentFilter,
    documentType: DocumentType,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<DocumentView[]> => {
    const response: ApiRequestResponse<DocumentView> = await this.send(
      POST,
      '',
      documentType + DocumentsEndpoints.Find,
      { ...options, body: JSON.stringify(data) },
      requestOptions
    );

    return response.result.items;
  };

  addPositionsToExistingDocument = async (
    data: DocumentServiceProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<ResponseSuccessOfDocumentView> => {
    const response: any = await this.send(
      POST,
      '',
      data.documentType + '/' + data.documentId,
      { ...options, body: JSON.stringify(data.items) },
      requestOptions
    );
    console.log('response add position', JSON.stringify(response.result.items, undefined, 4));
    return response;
  };

  addAttachmentToExistingItem = async ({ attachment, itemId, documentType, documentId }: AddAttachmentToItemProps) => {
    try {
      const url = `${this.customApiPath || BaseService.apiPath}${this.basePath}${
        documentType + '/' + documentId + DocumentsEndpoints.Items + itemId + DocumentsEndpoints.Attachments
      }`;
      console.log(url);
      const response: any = await ReactNativeBlobUtil.config({
        trusty: true,
      }).fetch(
        'POST',
        url,
        { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${rootStore.appStore.keycloak.token}` },
        [{ name: 'attachments', filename: 'sign.png', data: attachment }]
      );

      console.log('response add attachment', JSON.stringify(response));
      return response;
    } catch (e) {
      throw new Error('loading file failed ' + e);
    }
  };

  editPropertiesOfExistingDocument = async (
    data: EditPositionsOfDocumentProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<DocumentView> => {
    const response: any = await this.send(
      PUT,
      '',
      data.documentType + '/' + data.documentId + DocumentsEndpoints.Properties,
      { ...options, body: JSON.stringify({ properties: data.properties }) },
      requestOptions
    );
    return response;
  };

  editItemOfExistingDocument = async (
    data: EditPositionsOfDocumentProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = undefined
  ): Promise<ResponseSuccessOfDocumentView> => {
    const body = JSON.stringify({
      additionalInfo: data?.additionalInfo,
      properties: data.properties,
      referenceMasterCode: data.referenceMasterCode,
    });
    const response: any = await this.send(
      PUT,
      '',
      data.documentType + '/' + data.documentId + DocumentsEndpoints.Items + data.itemId,
      {
        ...options,
        body,
      },
      requestOptions
    );
    return response;
  };

  changeDocumentStatus = async (
    data: EditPositionsOfDocumentProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<ResponseSuccessOfDocumentView> => {
    const response: any = await this.send(
      PUT,
      '',
      data.documentType + '/' + data.documentId + DocumentsEndpoints.status + '/' + data.status + '/properties',
      { ...options, body: JSON.stringify({ ...data.properties }) },
      requestOptions
    );
    return response;
  };

  changeItemDocumentStatus = async (
    data: DocumentServiceProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<ResponseSuccessOfDocumentView> => {
    const response: any = await this.send(
      PUT,
      '',
      data.documentType + '/' + data.documentId + DocumentsEndpoints.Items + data.itemId + '/' + data.status,
      { ...options, body: JSON.stringify({ not: 'null' }) },
      requestOptions
    );
    return response;
  };

  deleteItemsOfExistingDocument = async (
    data: DocumentServiceProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<ResponseSuccessOfDocumentView> => {
    const response: any = await this.send(
      DELETE,
      '',
      data.documentType + '/' + data.documentId + '/Items',
      { ...options, body: JSON.stringify(data.itemIds) },
      requestOptions
    );
    logToConsole('response delete position', response);
    return response;
  };

  getDocumentById = async (
    params: GetDocumentByIdProps,
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<ResponseSuccessOfDocumentView> => {
    const data = await this.send(
      GET,
      '',
      params.documentType + DocumentsEndpoints.GetById + params.documentId,
      options,
      requestOptions
    );
    return data;
  };
}

const documentsService = new DocumentsService();

export default documentsService;
