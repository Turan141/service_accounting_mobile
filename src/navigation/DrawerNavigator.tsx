import React from 'react';

import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import BottomNavigator from './BottomNavigator';
import { useLoginStore } from '../store/hooks';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Calculator from '../screens/calculator';
import HistoryCalculator from '../screens/calculator/HistoryCalculator';
import { colors } from '../theme';
import { navigate } from './RootNavigation';
import { AppStackScreens } from './enums';
import FeedbackStack from './stacks/FeedbackStack';
import { UpdateApp } from '../screens/updateApp';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const { logout } = useLoginStore();
  return (
    <Drawer.Navigator
      drawerPosition="right"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => {
        const { state, ...rest } = props;
        const newState = { ...state };
        newState.routes = newState.routes.filter(item => item.name !== 'CalculatorHistory');

        return (
          <DrawerContentScrollView {...props}>
            <DrawerItemList state={newState} {...rest} />
            <DrawerItem
              icon={() => <Icon size={24} name={'logout'} />}
              label="Выйти"
              onPress={logout}
              style={{ marginTop: 'auto' }}
            />
          </DrawerContentScrollView>
        );
      }}
    >
      <Drawer.Screen
        name="MainScreen"
        options={{
          headerShown: false,
          title: 'Главная',
        }}
        component={BottomNavigator}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          title: 'Заправка',
          headerTintColor: colors.blue.primary,
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Icon style={{ marginLeft: 15 }} onPress={() => navigate('MainScreen')} size={24} name={'arrow-left'} />
          ),
          drawerIcon: () => <Icon size={24} name={'fuel'} />,
        }}
        name="FuelCalculator"
        component={Calculator}
      />
      <Drawer.Screen
        options={{
          headerShown: true,
          title: 'История заправки',
          headerTintColor: colors.blue.primary,

          headerLeft: () => (
            <Icon style={{ marginLeft: 15 }} onPress={() => navigate('FuelCalculator')} size={24} name={'arrow-left'} />
          ),
        }}
        name="CalculatorHistory"
        component={HistoryCalculator}
      />
      <Drawer.Screen
        name={AppStackScreens.FeedbackStack}
        component={FeedbackStack}
        options={{ title: 'Обратная связь', drawerIcon: () => <Icon size={24} name={'pencil'} /> }}
      />
      <Drawer.Screen
        name={'UpdateApp'}
        component={UpdateApp}
        options={{ title: 'Обновление ПО', drawerIcon: () => <Icon size={24} name={'pencil'} /> }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
