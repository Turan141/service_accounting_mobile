import React, { FC, useCallback, useMemo, useState } from 'react';
import { View, Text } from 'react-native';
import { TaskStatusesEnum, TaskStepSchema } from '../../../services/data';
import { observer } from 'mobx-react-lite';
import { TenderStepperKeys } from '../../../utils/constants/serviceTenders';
import { ScrollViewContainer } from '../../../ui-kit/Containers';
import { TaskStepper } from '../../../components/Tasks';
import fonts from '../../../theme/fonts';
import Divider from '../../../ui-kit/Divider';
import TextInput from '../../../ui-kit/TextInput';
import { FormGroup } from '../../../ui-kit/Forms';
import TimerWork from '../../../components/TimerWork/TimerWork';
import { TenderScreenProps } from '../../../navigation/props';
import { InlineAlert } from '../../../ui-kit/Alerts';
import { useTendersStore } from '../../../store/hooks';
import { DocumentItemView } from '../../../typings/swagger/api';
import { TASKS_STACK } from '../../../navigation/stacks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { Controller, useForm } from 'react-hook-form';
import TieDownStrapsAndNetsRentReport from './TieDownStrapsAndNetsRentReport';
import TenderCompletionPartForm from '../TenderCompletionPartForm';
import useForcedDowntime from '../../../hooks/useForcedDowntime';
import TenderInfo from '../TenderInfo';

export interface ProvisioningMinibusFormValues {
  garageNumberOfSpecialEquipment: string;
  forcedDownTime: DocumentItemView | boolean;
  forcedDownTimeAdditionalInfo: string;
  [DocumentItemNamesEnum.TieDownStrapsAndNetsRent]: DocumentItemView;
  itemAdditionalInfo: string;
  kitsCount: string;
  serviceCancellation: boolean;
  canCancelService: boolean;
  status: TaskStatusesEnum;
  additionalInfo: string;
  serviceCancellationReason: string;
}

const TieDownStrapsAndNetsRentScreen: FC<TenderScreenProps> = ({ navigation }) => {
  const { currentTender, editItemOfDocument, cancelService, changeItemStatus, loading } = useTendersStore();

  const stepperSteps: TaskStepSchema[] = useMemo(
    () => [
      { order: 1, label: 'Информация', key: TenderStepperKeys.Info, disabled: false, visited: true },
      {
        order: 2,
        label: 'Швартовочное оборудование',
        key: TenderStepperKeys.Execution,
        disabled: false,
        visited: currentTender.status === TaskStatusesEnum.Started,
      },
      { order: 3, label: 'Результат', key: TenderStepperKeys.Result, disabled: false },
    ],
    []
  );

  const [currentStep, setCurrentStep] = useState<TenderStepperKeys>(TenderStepperKeys.Info);

  const tenderItem = currentTender?.items?.find(item => item.type === DocumentItemNamesEnum.TieDownStrapsAndNetsRent);
  const tenderItemName = DocumentItemNamesEnum.TieDownStrapsAndNetsRent;

  const formControls = useForm<ProvisioningMinibusFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      garageNumberOfSpecialEquipment: currentTender.items?.find(
        item => item.type === DocumentItemNamesEnum.GarageNumberOfSpecialEquipment
      )?.additionalInfo,
      forcedDownTime: currentTender?.items?.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime),
      forcedDownTimeAdditionalInfo: currentTender?.items?.find(
        item => item.type === DocumentItemNamesEnum.ForcedDownTime
      )?.additionalInfo,
      serviceCancellation: false,
      canCancelService: !tenderItem.properties?.started,
      [tenderItemName]: tenderItem,
      itemAdditionalInfo: currentTender?.items?.find(item => item.type === tenderItemName)?.additionalInfo,
      kitsCount: tenderItem.properties?.kitsCount,
      status: TaskStatusesEnum.ConfirmedPerformer,
      additionalInfo: '',
      serviceCancellationReason: '',
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
    setValue,
  } = formControls;

  const handleMoveNext = async values => {
    if (values.serviceCancellation && values.serviceCancellationReason && !values.forcedDownTime) {
      try {
        await cancelService(values.serviceCancellationReason);
        navigation.navigate(TASKS_STACK);
      } catch (e) {}
      return;
    }

    if (values.forcedDownTime?.status === TaskStatusesEnum.Started) {
      await changeItemStatus(TaskStatusesEnum.Completed, undefined, values.forcedDownTime.id).then(result =>
        setValue('forcedDownTime', result)
      );
    }

    if (values[tenderItemName].status === TaskStatusesEnum.Started) {
      const resultItem = await changeItemStatus(TaskStatusesEnum.Completed, undefined, values[tenderItemName]?.id);
      setValue(tenderItemName, resultItem);
    }

    setCurrentStep(TenderStepperKeys.Result);
  };

  const { ForcedDownTimeControls } = useForcedDowntime(formControls);

  const calculateTime = useCallback((item: DocumentItemView) => {
    if (item.properties?.started && item.properties?.completed) {
      return +item.properties?.completed - +item.properties?.started;
    }
    if (item.properties?.started && !item.properties?.completed) {
      return Date.now() - +item.properties?.started;
    }
    return 0;
  }, []);

  const handleWorkTimer = useCallback(() => {
    const item: DocumentItemView = watch(tenderItemName);
    if (!item?.properties?.started) {
      changeItemStatus(TaskStatusesEnum.Started, tenderItemName).then(item => {
        setValue(tenderItemName, item);
        setValue('canCancelService', false);
        clearErrors(tenderItemName);
      });
    } else if (item?.properties?.started && !item?.properties?.completed) {
      changeItemStatus(TaskStatusesEnum.Completed, tenderItemName).then(item => {
        setValue(tenderItemName, item);
        clearErrors(tenderItemName);
      });
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
          <TenderInfo onPress={() => setCurrentStep(TenderStepperKeys.Execution)} />
        )}

        {currentStep === TenderStepperKeys.Execution && (
          <View style={{ padding: 20 }}>
            {errors.serviceCancellationReason ? (
              <InlineAlert type="danger">Чтобы отказаться от услуги, введите причину отказа</InlineAlert>
            ) : null}

            {errors.forcedDownTime ? (
              <InlineAlert type="danger">
                Чтобы начать Швартовочное оборудование, сначала отожмите кнопку «Вынужденный простой»
              </InlineAlert>
            ) : null}

            {errors[tenderItemName] ? (
              <InlineAlert type="danger">
                Чтобы Завершить и перейти к результату, сначала сделайте Выполнение или Отказ от услуги
              </InlineAlert>
            ) : null}

            <FormGroup>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                name="kitsCount"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Кол-во комплектов"
                    value={value}
                    keyboardType={'numeric'}
                    onChangeText={onChange}
                    onBlur={() =>
                      editItemOfDocument({
                        id: tenderItem.id,
                        properties: {
                          kitsCount: value,
                        },
                      })
                    }
                  />
                )}
              />
            </FormGroup>

            {ForcedDownTimeControls}

            <Divider />

            <FormGroup>
              <Text style={fonts.paragraphSemibold}>Выполнение</Text>
              <Controller
                control={control}
                name={tenderItemName}
                render={({ field: { value } }) => {
                  return (
                    <TimerWork
                      completed={!!value.properties?.completed}
                      disabled={
                        watch('forcedDownTime')?.properties?.started && !watch('forcedDownTime')?.properties?.completed
                      }
                      time={calculateTime(value)}
                      onPress={handleWorkTimer}
                      style={{ marginTop: 24 }}
                    />
                  );
                }}
              />
            </FormGroup>

            <Divider />
            <TenderCompletionPartForm
              loading={loading}
              formControls={formControls}
              tenderItemName={tenderItemName}
              handleMoveNext={handleMoveNext}
            />
          </View>
        )}

        {currentStep === TenderStepperKeys.Result && <TieDownStrapsAndNetsRentReport />}
      </ScrollViewContainer>
    </>
  );
};

export default observer(TieDownStrapsAndNetsRentScreen);
