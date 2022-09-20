import React, { FC } from 'react';
import { colors, fonts, layout } from '../../theme';
import { createStackNavigator } from '@react-navigation/stack';
import { BackButton } from '../../ui-kit/Buttons';
import { TasksStackScreens } from '../enums';
import {
  TaskDetailsScreen,
  TaskInProgressScreen,
  TasksScreen,
  TaskReportScreen,
  TaskReportSignScreen,
  TasksSearchScreen,
} from '../../screens/tasks';
import { BaseScreenProps } from '../props';
import { TasksStackParamList } from '../params';
import { getMaintenanceItemNameByType } from '../../utils';
import { MaintenanceScreen } from '../../screens/maintenance';
import { IconButton } from 'react-native-paper';
import { useTasksStore, useUserStore } from '../../store/hooks';
import { observer } from 'mobx-react';
import { UserRolesEnum } from '../../services/data';
import { PooEnterTransportNumberScreen } from '../../screens/poo';
import { View } from 'react-native';
import BurgerButton from '../../ui-kit/Buttons/BurgerButton';
import TaskConfirmedScreen from '../../screens/tasks/TaskConfirmedScreen';

const Stack = createStackNavigator<TasksStackParamList>();

const TasksStack: FC<BaseScreenProps> = ({ navigation }) => {
  const { isSearchEnabled } = useTasksStore();
  const { user } = useUserStore();

  return (
    <Stack.Navigator
      // initialRouteName={
      //   user?.roles.includes(UserRolesEnum.WorkerInCar)
      //     ? TasksStackScreens.PooEnterTransportNumber
      //     : TasksStackScreens.Tasks
      // }
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
        name={TasksStackScreens.Tasks}
        component={TasksScreen}
        options={{
          title: 'Задачи',
          headerLeft: null,
          headerRight: () => {
            return (
              <View style={layout.rowAlignCenter}>
                {!isSearchEnabled && user?.roles.includes(UserRolesEnum.Agent) ? (
                  <IconButton
                    icon="magnify"
                    onPress={() => navigation.navigate(TasksStackScreens.TasksSearch as any)}
                    size={24}
                    style={{
                      borderRadius: 100,
                    }}
                    color={colors.violet.primary}
                  />
                ) : null}
                <BurgerButton />
              </View>
            );
          },
        }}
      />
      {/*
        Enter transport number screen
        If user role is WorkerInCar first we get the work type
      */}
      <Stack.Screen
        name={TasksStackScreens.PooEnterTransportNumber}
        component={PooEnterTransportNumberScreen}
        options={{
          title: 'ПОО номер машины',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name={TasksStackScreens.TasksSearch}
        component={TasksSearchScreen}
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
        name={TasksStackScreens.TaskDetails}
        component={TaskDetailsScreen}
        options={({ route }) => ({
          title: `Рейс ID ${route.params.numberOfFlight}`,
          headerTitleAlign: 'center',
        })}
        initialParams={{
          id: null,
          numberOfFlight: '',
        }}
      />

      <Stack.Screen
        name={TasksStackScreens.TaskConfirmed}
        component={TaskConfirmedScreen}
        options={({ route }) => ({
          title: `Заявка № ${route.params.data.number}`,
          headerTitleAlign: 'center',
        })}
      />

      <Stack.Screen
        name={TasksStackScreens.TaskInProgress}
        component={TaskInProgressScreen}
        options={({ route }) => ({
          title: `Рейс ID ${route.params.numberOfFlight}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...fonts.bodyRegular,
            width: '100%',
          },
        })}
        initialParams={{
          id: null,
          numberOfFlight: '',
        }}
      />

      <Stack.Screen
        name={TasksStackScreens.Maintenance}
        component={MaintenanceScreen}
        options={({ route }) => ({
          title: `${getMaintenanceItemNameByType(route.params.type)}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...fonts.bodyRegular,
            width: '100%',
          },
        })}
        initialParams={{
          type: null,
        }}
      />

      <Stack.Screen
        name={TasksStackScreens.TaskReport}
        component={TaskReportScreen}
        options={({ route }) => ({
          title: `Отчет по рейсу ID ${route.params.id}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...fonts.bodyRegular,
            width: '100%',
          },
        })}
        initialParams={{
          id: null,
        }}
      />

      <Stack.Screen
        name={TasksStackScreens.TaskReportSign}
        component={TaskReportSignScreen}
        options={({ route }) => ({
          title: `Отчет по рейсу ID ${route.params.id}`,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            ...fonts.bodyRegular,
            width: '100%',
          },
        })}
        initialParams={{
          id: null,
        }}
      />
    </Stack.Navigator>
  );
};

export const TASKS_STACK = 'TasksStack';

export default observer(TasksStack);
