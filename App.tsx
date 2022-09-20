import React, { FC, useCallback, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StoreProvider } from './src/store';

import SplashScreen from 'react-native-splash-screen';
import AppContainer from './src/containers/AppContainer';
import { ErrorBoundary } from './src/components/Errors';

import FlashMessage from 'react-native-flash-message';

const App: FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <ErrorBoundary>
      <StoreProvider>
        <PaperProvider>
          <FlashMessage position="top" />
          <AppContainer />
        </PaperProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default App;
