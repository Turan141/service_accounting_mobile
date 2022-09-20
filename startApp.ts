import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { turnOnApiGlobalErrorHandling } from './src/services/errors';

import App from './App';

import { disableFontScaling } from './src/utils';

const startApp = async () => {
  turnOnApiGlobalErrorHandling();

  disableFontScaling();

  AppRegistry.registerComponent(appName, () => App);
};

export default startApp;
