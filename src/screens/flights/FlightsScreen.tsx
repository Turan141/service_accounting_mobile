import React, { FC, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { ScrollViewContainer } from '../../ui-kit/Containers';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';
import { TasksScreenProps } from '../../navigation/props';
import { observer } from 'mobx-react';
import { useFlightStore, useUserStore } from '../../store/hooks';
import { TasksCalendar } from '../../components/Tasks';
import { UserRolesEnum } from '../../services/data';
import { useFocusEffect } from '@react-navigation/core';
import { EnSortDirection } from '../../typings/swagger/api';
import { format } from 'date-fns';

const FlightsScreen: FC<TasksScreenProps> = () => {
  const { user } = useUserStore();
  const { loading, flights, getFlights, showResults, setCurrentFlight } = useFlightStore();

  const getItems = useCallback(() => {
    if (user?.roles.includes(UserRolesEnum.Agent)) {
      getFlights({
        sortDirection: EnSortDirection.ASC,
        take: '40',
        skip: '0',
        flightDate: format(Date.now(), 'yyyy-MM-dd'),
      });
    }
  }, []);

  useFocusEffect(getItems);

  const renderTasksCalendar = () => {
    const calendarItems = flights;
    return Array.isArray(calendarItems) && calendarItems.length ? (
      <TasksCalendar
        setCurrentFlight={setCurrentFlight}
        showResults={showResults}
        loading={loading}
        items={calendarItems}
      />
    ) : null;
  };

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <ScrollViewContainer noPadding refreshControl={<RefreshControl refreshing={loading} onRefresh={getItems} />}>
      {renderTasksCalendar()}
    </ScrollViewContainer>
  );
};

export default observer(FlightsScreen);
