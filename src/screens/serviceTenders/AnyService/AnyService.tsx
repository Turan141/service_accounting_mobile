import React, { FC, useEffect, useMemo, useState } from 'react';
import { TaskStatusesEnum, TaskStepSchema } from '../../../services/data';
import { observer } from 'mobx-react-lite';
import { TenderStepperKeys } from '../../../utils/constants/serviceTenders';
import { ScrollViewContainer } from '../../../ui-kit/Containers';
import { TaskStepper } from '../../../components/Tasks';
import { TenderScreenProps } from '../../../navigation/props';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import AnyServiceReport from './AnyServiceReport';
import TenderInfo from '../TenderInfo';

const AnyServiceScreen: FC<TenderScreenProps> = ({ navigation }) => {
  const { currentTender, changeTenderStatus } = useTendersStore();

  const stepperSteps: TaskStepSchema[] = useMemo(
    () => [
      { order: 1, label: 'Информация', key: TenderStepperKeys.Info, disabled: false, visited: true },
      { order: 2, label: 'Результат', key: TenderStepperKeys.Result, disabled: false },
    ],
    []
  );

  const [currentStep, setCurrentStep] = useState<TenderStepperKeys>(TenderStepperKeys.Info);

  const tenderItemName = DocumentItemNamesEnum.AnyServiceFlight;
  const tenderItem = currentTender.items.find(item => item.type === DocumentItemNamesEnum.AnyServiceFlight);

  useEffect(() => {
    if (currentTender.status === TaskStatusesEnum.ConfirmedPerformer) {
      changeTenderStatus(TaskStatusesEnum.Started);
    }
  }, []);

  return (
    <>
      <TaskStepper setStep={setCurrentStep} steps={stepperSteps} currentKey={currentStep} />

      <ScrollViewContainer
        contentContainerStyle={{
          padding: 0,
        }}
      >
        {currentStep === TenderStepperKeys.Info && (
          <TenderInfo onPress={() => setCurrentStep(TenderStepperKeys.Result)} />
        )}

        {currentStep === TenderStepperKeys.Result && <AnyServiceReport />}
      </ScrollViewContainer>
    </>
  );
};

export default observer(AnyServiceScreen);
