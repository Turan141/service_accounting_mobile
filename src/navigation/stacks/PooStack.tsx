import React, { FC } from 'react';
import { colors } from '../../theme';
import { fontFamilyRegular } from '../../theme/fonts';
import { createStackNavigator } from '@react-navigation/stack';

import { BackButton } from '../../ui-kit/Buttons';

import { PooStackScreens } from '../enums';
import {
  PooAgentResultsNextScreen,
  PooAgentResultsScreen,
  PooAgentScreen,
  PooCodeScreen,
  PooEnterTransportNumberScreen,
  PooSignScreen,
  PooTransportEmployeeScreen,
  PooUpdateReasonScreen,
} from '../../screens/poo';
import { PooStackParamList } from '../params';
import { useTendersStore } from '../../store/hooks';

const Stack = createStackNavigator<PooStackParamList>();

const PooStack: FC = () => {
  const { currentTender } = useTendersStore();

  return (
    <Stack.Navigator
      initialRouteName={PooStackScreens.PooEnterTransportNumber}
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
        name={PooStackScreens.PooAgent}
        component={PooAgentScreen}
        options={{
          title: `ПОО ВС рейс ID ${currentTender?.numberOfFlight}`,
          headerTitleAlign: 'center',
        }}
        initialParams={{
          id: null,
          updateAfterDone: false,
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooSign}
        component={PooSignScreen}
        options={{
          title: 'Подпись заказчика',
          headerTitleAlign: 'center',
        }}
        initialParams={{
          id: null,
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooEnterTransportNumber}
        component={PooEnterTransportNumberScreen}
        options={{
          title: 'ПОО номер машины',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooUpdateReason}
        component={PooUpdateReasonScreen}
        options={{
          title: 'ПОО номер машины',
          headerTitleAlign: 'center',
        }}
        initialParams={{
          id: null,
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooTransportEmployee}
        component={PooTransportEmployeeScreen}
        options={({ route }) => ({
          title: `ПОО ВС рейс ID ${route.params.numberOfFlight}`,
          headerTitleAlign: 'center',
        })}
        initialParams={{
          numberOfFlight: '',
          deicingTreatmentId: null,
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooAgentResults}
        component={PooAgentResultsScreen}
        options={({ route }) => ({
          title: `ПОО ВС рейс ID ${route.params.numberOfFlight}`,
          headerTitleAlign: 'center',
        })}
        initialParams={{
          numberOfFlight: '',
          id: null,
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooAgentResultsNext}
        component={PooAgentResultsNextScreen}
        options={{
          title: 'ПОО Итоги',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name={PooStackScreens.PooCode}
        component={PooCodeScreen}
        options={{
          title: 'Код антиоблиденительной обработки',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export const POO_STACK = 'PooStack';

export default PooStack;
