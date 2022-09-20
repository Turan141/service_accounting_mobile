import BaseService from '../BaseService';
import { showMessage } from 'react-native-flash-message';
import NetInfo from '@react-native-community/netinfo';

const ERROR_HTTP_STATUS_CODES: number[] = [422, 401, 426, 413, 400, 404, 449];
export enum ErrorHttpTypesEnum {
  NetworkError = 'NetworkError',
}

/**
 * Turn on API gloval error handling
 */
export function turnOnApiGlobalErrorHandling() {
  let errorMessage = '';

  BaseService.commonErrorHandlers.push((error, status, type) => {
    if ((type === ErrorHttpTypesEnum.NetworkError || ERROR_HTTP_STATUS_CODES.includes(status)) && error) {
      errorMessage = error;
    } else {
      errorMessage = 'Неизвестная ошибка на сервере';
    }
    NetInfo.fetch().then(state => {
      if (!state.isInternetReachable) {
        errorMessage = 'Отсутствует соединение с интернетом';
      }
      showMessage({
        type: 'danger',
        icon: 'auto',
        message: status ? 'Ошибка ' + status : 'Ошибка',
        description: errorMessage + ' ' + error,
        autoHide: false,
      });
    });
  });
}

/**
 * Show default toast with an error
 */
export function showUnhandledErrorToast() {
  showMessage({
    type: 'danger',
    icon: 'auto',
    message: 'Ошибка',
    description: 'Неизвестная ошибка на сервере',
  });
}
