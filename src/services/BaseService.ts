import { GET, HTTPMethod } from '../utils';
import { logToConsole } from '../utils/formatting';

import { fetch as origFetch, ReactNativeSSLPinning } from 'react-native-ssl-pinning';
import isIP from '../utils/http/isIp';
import { rootStore } from '../store/RootStore';

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

export class HTTPRequestError extends Error {
  // Error text from the server
  error: string;
  // Http status if request was OK
  status: number;
  // Original request error
  originalError: Error;
  // Data that was received with the incorrect http status
  originalData: any;

  constructor(error: string, status?: number, originalError?: Error, originalData?: any) {
    super(error);
    this.error = error;
    this.status = status;
    this.originalError = originalError;
    this.originalData = originalData;
  }
}

export interface RestServiceRequestOptions {
  // Turn off global options transformation
  withoutOptionsMiddlewares?: boolean;
  // Turn off the global error handler
  withoutErrorHandlers?: boolean;
}

export default class BaseService {
  // Global url for all services that inherit this class
  static apiPath = rootStore.appStore.config.apiUrl;
  static userToken = null;

  static commonOptionsMiddlewares: Array<(options: RequestInit) => RequestInit> = [
    options => ({
      ...options,
      headers: {
        ...options.headers,
        // Working with JSON
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    }),
  ];
  static commonErrorHandlers: Array<(error: string, status?: number, type?: string, response?: any) => void> = [];

  // Здесь можно указать кастомный путь для конкретного инстанса сервиса
  customApiPath: string = '';

  // Дополнительный путь к конкретному endpoint
  basePath: string = '';

  /**
   * Make HTTP request
   *
   * @param method http method
   * @param params query string for GET request
   * @param subPath additional path for the service: `${apiPath}/${this.basePath}/${subPath}`
   * @param options http request params
   * @param requestOptions additional params for service
   */
  send = async (
    method: HTTPMethod = GET,
    params: string = '',
    subPath: string = '',
    options: RequestInit = {},
    requestOptions: RestServiceRequestOptions = {}
  ): Promise<any> => {
    const optionsMiddlewares = BaseService.commonOptionsMiddlewares;
    const errorHandlers = BaseService.commonErrorHandlers;

    let computedOptions: RequestInit = {
      method,
    };

    if (!requestOptions.withoutOptionsMiddlewares) {
      optionsMiddlewares.forEach(middleware => (computedOptions = middleware(computedOptions)));
    }

    computedOptions = {
      ...computedOptions,
      ...options,
    };

    const url = `${this.customApiPath || BaseService.apiPath}${this.basePath}${subPath}${params ? `?${params}` : ''}`;

    logToConsole({
      url,
      ...(isIP(url) && {
        sslPinning: {
          certs: ['ca'],
        },
      }),
      disableAllSecurity: !isIP(url),
      ...computedOptions,
      headers: {
        ...computedOptions.headers,
        Authorization: `Bearer ${rootStore.appStore?.keycloak?.token}`,
      },
    });

    let response: ReactNativeSSLPinning.Response;
    try {
      response = await fetch(url, {
        ...computedOptions,
        headers: {
          ...computedOptions.headers,
          Authorization: `Bearer ${rootStore.appStore?.keycloak?.token}`,
        },
      });
    } catch (error) {
      if (!requestOptions.withoutErrorHandlers) {
        logToConsole(error);
        errorHandlers.forEach(handler =>
          handler(error?.message || error?.bodyString || JSON.stringify(error, undefined, 4), error?.status)
        );
      }
      throw new HTTPRequestError(error.message, null, error);
    }
    if (response) {
      return response
        .json()
        .then(json => Promise.resolve(json))
        .catch(() => Promise.resolve(response));
    } else {
      // Возможно сервер прислал читаемую ошибку
      let message = '';
      let errorData = null;
      try {
        errorData = await response.json();
        console.log(errorData);
        if (errorData.message) {
          message = errorData.message;
        }
      } catch (e) {
        // Все таки не прислал
        console.log({ e });
      }

      if (!requestOptions.withoutErrorHandlers) {
        errorHandlers.forEach(handler => handler(message, response.status));
      }

      throw new HTTPRequestError(message, response.status, null, errorData);
    }
  };
}
