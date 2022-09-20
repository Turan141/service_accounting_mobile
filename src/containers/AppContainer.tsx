import React, { FC, useCallback, useEffect } from 'react';
import { Alert, StatusBar, StyleSheet } from 'react-native';
import { LinkingOptions, NavigationContainer } from '@react-navigation/native';
import { enableScreens } from 'react-native-screens';
import { colors } from '../theme';
import { AuthStackScreens } from '../navigation/enums';
import { isReadyRef, navigationRef } from '../navigation/RootNavigation';
import { useAppStore, useLoginStore, useUserStore } from '../store/hooks';
import { observer } from 'mobx-react';
import { NotificationAlert } from '../ui-kit/Alerts';
import NoRightsAlert from '../components/NoRightsAlert';
import NoAuthScreen from '../screens/auth/NoAuthScreen';
import DrawerNavigator from '../navigation/DrawerNavigator';
import { AUTH_STACK } from '../navigation/stacks';
// import { createSignalRContext } from 'react-signalr';
import { ReactNativeKeycloakProvider } from '../lib/rnkeycloak';
// import signalR, { HttpTransportType, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

enableScreens();

// const SignalRContext = createSignalRContext();

const AppContainer: FC = () => {
  const { loading } = useLoginStore();
  const { notificationAlert, showNoRightsScreen, config, keycloak } = useAppStore();
  const { user } = useUserStore();

  const onTokensLoad = useCallback(tokens => {
    console.log(tokens);
  }, []);

  console.log(config.apiUrl);

  // useEffect(() => {
  //   const hubConnection = new HubConnectionBuilder()
  //     .withUrl(`http://172.28.2.20:30099/clients/documenteventshub`, {
  //       skipNegotiation: true,
  //       transport: HttpTransportType.WebSockets,
  //       withCredentials: false,
  //     })
  //     // .configureLogging(LogLevel.Trace)
  //     .withAutomaticReconnect()
  //     .build();
  //   hubConnection
  //     .start()
  //     .then(() => {
  //       console.log('Connected!');
  //     })
  //     .catch(e => console.log('Connection failed: ', e));
  //   hubConnection.on('DocumentLocked', message => {
  //     showAlert();
  //   });
  //   hubConnection.on('DocumentUnLocked', message => {
  //     console.log('zarabotal');
  //   });
  // }, []);

  const linking: LinkingOptions = {
    prefixes: ['clients://'],
    config: {
      screens: {
        [AUTH_STACK]: {
          screens: {
            [AuthStackScreens.Login]: {
              path: 'homepage',
            },
          },
        },
      },
    },
  };

  // if (loading) {
  //   return <SpinnerLoading />;
  // }

  if (!user) {
    return <NoAuthScreen />;
  }

  if (showNoRightsScreen) {
    return <NoRightsAlert />;
  }

  return (
    <ReactNativeKeycloakProvider
      onTokens={onTokensLoad}
      authClient={keycloak}
      initOptions={{
        redirectUri: config.keycloak.redirectUrl,
        inAppBrowserOptions: {},
      }}
      onEvent={(event, error) => {
        console.log('onKeycloakEvent', {
          event,
          error,
        });
      }}
    >
      {/* <SignalRContext.Provider url={'https://clients.test.utg.group/clients/documenteventshub'}> */}
      <NavigationContainer
        linking={linking}
        ref={navigationRef}
        onReady={() => {
          (isReadyRef as any).current = true;
        }}
      >
        <StatusBar backgroundColor={colors.background} barStyle="light-content" />
        <DrawerNavigator />

        {/* Notification */}
        <NotificationAlert {...notificationAlert} position="top" />
      </NavigationContainer>
      {/* </SignalRContext.Provider> */}
    </ReactNativeKeycloakProvider>
  );
};

export default observer(AppContainer);
