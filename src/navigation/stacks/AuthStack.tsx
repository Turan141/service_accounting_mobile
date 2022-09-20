import React, { FC } from 'react';
import { colors } from '../../theme';
import { fontFamilyRegular } from '../../theme/fonts';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../../ui-kit/Buttons';

import { AuthStackScreens } from '../enums';
import { LoginScreen, NewPasswordScreen, PasswordResetScreen, PhoneScreen, PinCodeScreen } from '../../screens/auth';
import { AuthStackParamList } from '../params';

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={AuthStackScreens.Login}
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontSize: 16,
          fontFamily: fontFamilyRegular,
        },
        headerLeft: ({ onPress }) => <BackButton onPress={onPress} />,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen
        name={AuthStackScreens.Login}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
        initialParams={{
          token: null,
        }}
      />

      <Stack.Screen
        name={AuthStackScreens.Phone}
        component={PhoneScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthStackScreens.PinCode}
        component={PinCodeScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthStackScreens.PasswordReset}
        component={PasswordResetScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthStackScreens.NewPassword}
        component={NewPasswordScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export const AUTH_STACK = 'AuthStack';

export default AuthStack;
