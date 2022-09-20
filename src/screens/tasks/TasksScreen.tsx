import React, { FC, useCallback } from 'react';
import { RefreshControl } from 'react-native';

import { ScrollViewContainer } from '../../ui-kit/Containers';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';

import { TasksScreenProps } from '../../navigation/props';
import { observer } from 'mobx-react';
import { useAppStore, useTendersStore, useTreatmentsStore, useUserStore } from '../../store/hooks';
import { TasksCalendar } from '../../components/Tasks';
import { TaskStatusesEnum, UserRolesEnum } from '../../services/data';
import { useFocusEffect } from '@react-navigation/core';
import NoDataFound from '../../components/NoDataFound';

const TasksScreen: FC<TasksScreenProps> = () => {
  const { user } = useUserStore();
  const { loading, tenders, getTenders, showResults, setCurrentTender } = useTendersStore();
  const { deicingTreatments, getDeicingTreatments } = useTreatmentsStore();

  const getItems = useCallback(() => {
    if (user?.roles.includes(UserRolesEnum.Agent)) {
      getTenders({
        take: 20,
        skip: 0,
        filter: {
          statuses: [TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started],
        },
      });
    } else if (user?.roles.includes(UserRolesEnum.WorkerInCar)) {
      getDeicingTreatments();
    }
  }, []);

  useFocusEffect(getItems);

  const renderTasksCalendar = () => {
    let calendarItems;

    if (user?.roles.includes(UserRolesEnum.Agent)) {
      calendarItems = tenders;
    } else if (user?.roles.includes(UserRolesEnum.WorkerInCar)) {
      calendarItems = deicingTreatments;
    }
    return Array.isArray(calendarItems) && calendarItems.length ? (
      <TasksCalendar
        setCurrentTender={setCurrentTender}
        loading={loading}
        showResults={showResults}
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

export default observer(TasksScreen);
