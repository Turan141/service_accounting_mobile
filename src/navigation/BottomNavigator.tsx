import { APP_STACK, AppStack, POO_STACK, PooStack, TASKS_STACK, TasksStack, TENDER_STACK, TenderStack } from './stacks';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const BottomNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={APP_STACK} component={AppStack} />
      <Stack.Screen name={POO_STACK} component={PooStack} />
      {/*<Stack.Screen name={TASKS_STACK} component={TasksStack} />*/}
      <Stack.Screen name={TENDER_STACK} component={TenderStack} />
    </Stack.Navigator>
  );
};

export default BottomNavigator;
