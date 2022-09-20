import React, { FC, useCallback, useMemo } from 'react';
import { ContainerWithButton } from '../../ui-kit/Containers';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';
import { useTendersStore, useUserStore } from '../../store/hooks';
import { observer } from 'mobx-react';
import { TaskDetailsScreenProps } from '../../navigation/props';
import { TaskStatusesEnum, TenderTypesEnum } from '../../services/data';
import { TasksStackScreens } from '../../navigation/enums';
import useTenderPropertiesList from '../../hooks/useTenderPropertiesList';

const TaskConfirmedScreen: FC<TaskDetailsScreenProps> = ({ navigation }) => {
  const { user } = useUserStore();
  const { loading, acceptTender, currentTender } = useTendersStore();
  const { properties, items } = currentTender;

  const { TenderPropertiesList } = useTenderPropertiesList(currentTender);

  const handleTaskAccept = useCallback(() => {
    acceptTender({
      documentId: currentTender.id,
      documentType: 'Requests',
      status: TaskStatusesEnum.ConfirmedPerformer,
    }).then(() => navigation.replace(TasksStackScreens.Tasks));
  }, []);

  if (loading) {
    return <SpinnerLoading />;
  }

  return (
    <ContainerWithButton buttonLabel="Принял" onButtonPress={handleTaskAccept} label={properties.serviceName}>
      <TenderPropertiesList style={{ marginBottom: 12, marginTop: 10 }} />
    </ContainerWithButton>
  );
};

export default observer(TaskConfirmedScreen);
