import React, { FC, useEffect, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';

import { ScrollViewContainer } from '../../ui-kit/Containers';
import { TkoTab, ServicesTab } from './components';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';
import Tab from '../../ui-kit/Tab';

import { observer } from 'mobx-react';
import { useTendersStore, useServicesStore } from '../../store/hooks';
import { TaskDetailsScreenProps } from '../../navigation/props';
import { TasksStackScreens } from '../../navigation/enums';
import { MaintanceTypesEnum } from '../../services/data';

const TaskInProgressScreen: FC<TaskDetailsScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { currentTender } = useTendersStore();
  const { services, loading, getServicesByFlightId } = useServicesStore();

  useEffect(() => {
    getServicesByFlightId(id);
  }, []);

  const handleNavigate = useCallback((type: MaintanceTypesEnum) => {
    navigation.navigate(TasksStackScreens.Maintenance, { type });
  }, []);
  console.log(services);
  const TKO = () => (
    <TkoTab
      items={services.filter(item => item.isService === false)}
      flightDirection={currentTender?.direction}
      onNavigate={handleNavigate}
    />
  );
  const Services = () => (
    <ServicesTab items={services.filter(item => item.isService === true)} onNavigate={handleNavigate} />
  );

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <Tab>
      <Tab.Item
        name="TKO"
        component={TKO}
        options={{
          tabBarLabel: 'ТКО',
        }}
      />

      <Tab.Item
        name="Services"
        component={Services}
        options={{
          tabBarLabel: 'Услуги',
        }}
      />
    </Tab>
  );
};

export default observer(TaskInProgressScreen);

const styles = StyleSheet.create({});
