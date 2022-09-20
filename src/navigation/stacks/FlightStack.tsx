import React, { FC } from 'react';
import { colors, fonts, layout } from '../../theme';
import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from '../../ui-kit/Buttons';
import { FlightsStackScreens } from '../enums';
import { TaskDetailsScreen } from '../../screens/tasks';
import { BaseScreenProps } from '../props';
import { FlightsStackParamList } from '../params';
import { IconButton } from 'react-native-paper';
import { useTasksStore, useUserStore } from '../../store/hooks';
import { observer } from 'mobx-react';
import { UserRolesEnum } from '../../services/data';
import { View } from 'react-native';
import BurgerButton from '../../ui-kit/Buttons/BurgerButton';
import FlightsScreen from '../../screens/flights/FlightsScreen';
import FlightsSearchScreen from '../../screens/flights/FlightsSearchScreen';
import FlightDetailsScreen from '../../screens/flights/FlightDetailsScreen';

const Stack = createStackNavigator<FlightsStackParamList>();

const FlightStack: FC<BaseScreenProps> = ({ navigation }) => {
  // const { isSearchEnabled } = useTasksStore();
  // const { user } = useUserStore();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: colors.white,
        headerTitleStyle: fonts.bodyRegular,
        headerLeft: ({ onPress }) => <BackButton onPress={onPress} />,
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen
        name={FlightsStackScreens.Flights}
        component={FlightsScreen}
        options={{
          title: 'Рейсы',
          headerLeft: null,
          headerRight: () => {
            return (
              <View style={layout.rowAlignCenter}>
                <IconButton
                  icon="magnify"
                  onPress={() => navigation.navigate(FlightsStackScreens.FlightsSearch as any)}
                  size={24}
                  style={{
                    borderRadius: 100,
                  }}
                  color={colors.violet.primary}
                />
                <BurgerButton />
              </View>
            );
          },
        }}
      />

      <Stack.Screen
        name={FlightsStackScreens.FlightsSearch}
        component={FlightsSearchScreen}
        options={{
          headerLeft: ({ onPress }) => (
            <IconButton
              icon="arrow-left"
              onPress={onPress}
              size={24}
              style={{
                borderRadius: 100,
              }}
              color={colors.violet.primary}
            />
          ),
          headerRight: null,
        }}
      />

      <Stack.Screen
        name={FlightsStackScreens.FlightDetailsScreen}
        component={FlightDetailsScreen}
        options={({ route }) => ({
          title: `Рейс ${route.params.data.flightNumber}`,
          headerTitleAlign: 'center',
        })}
      />
    </Stack.Navigator>
  );
};

export const FLIGHT_STACK = 'FlightStack';

export default observer(FlightStack);
