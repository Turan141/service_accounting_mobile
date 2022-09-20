import React from 'react';
import { StackActions, NavigationContainerRef } from '@react-navigation/native';
import { showUnhandledErrorToast } from '../services/errors';

export const navigationRef = React.createRef<NavigationContainerRef>();
export const isReadyRef = React.createRef();

export const navigate = (name: string, params?: object): void => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.navigate(name, params);
  } else {
    showUnhandledErrorToast();
  }
};

export const push = (name: string, params?: object): void => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.push(name, params));
  } else {
    showUnhandledErrorToast();
  }
};

export const replace = (name: string, params?: object): void => {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.dispatch(StackActions.replace(name, params));
  } else {
    showUnhandledErrorToast();
  }
};
