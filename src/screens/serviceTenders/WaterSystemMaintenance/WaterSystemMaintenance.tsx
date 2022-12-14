import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TaskStatusesEnum, TaskStepSchema } from '../../../services/data';
import { observer } from 'mobx-react-lite';
import { TenderStepperKeys } from '../../../utils/constants/serviceTenders';
import { ScrollViewContainer } from '../../../ui-kit/Containers';
import { TaskStepper } from '../../../components/Tasks';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';
import layout from '../../../theme/layout';
import { Select } from '../../../ui-kit/Selects';
import Divider from '../../../ui-kit/Divider';
import TextInput from '../../../ui-kit/TextInput';
import { FormGroup } from '../../../ui-kit/Forms';
import TimerWork from '../../../components/TimerWork/TimerWork';
import { TenderScreenProps } from '../../../navigation/props';
import { InlineAlert } from '../../../ui-kit/Alerts';
import { useDictionariesStore, useTendersStore } from '../../../store/hooks';
import { DocumentItemView } from '../../../typings/swagger/api';
import { TASKS_STACK } from '../../../navigation/stacks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { Controller, useForm } from 'react-hook-form';
import WaterSystemMaintenanceReport from './WaterSystemMaintenanceReport';
import TenderCompletionPartForm from '../TenderCompletionPartForm';
import useForcedDowntime from '../../../hooks/useForcedDowntime';
import TenderInfo from '../TenderInfo';

interface WaterSystemMaintenanceFormValues {
  garageNumberOfSpecialEquipment: string;
  forcedDownTime: DocumentItemView | boolean;
  forcedDownTimeAdditionalInfo: string;
  [DocumentItemNamesEnum.WaterSystemMaintenance]: DocumentItemView;
  itemAdditionalInfo: string;
  serviceCancellation: boolean;
  canCancelService: boolean;
  status: TaskStatusesEnum;
  additionalInfo: string;
  serviceCancellationReason: string;
}

const WaterSystemMaintenanceScreen: FC<TenderScreenProps> = ({ navigation, route }) => {
  const { currentTender, addPositionsToTender, editItemOfDocument, cancelService, changeItemStatus, loading } =
    useTendersStore();
  const { getDictionaryItemsByType, waterSystemOptions, setCurrentOptions } = useDictionariesStore();

  const stepperSteps: TaskStepSchema[] = useMemo(
    () => [
      { order: 1, label: '????????????????????', key: TenderStepperKeys.Info, disabled: false, visited: true },
      {
        order: 2,
        label: '???????????????????????? ?????????????? ??????????????',
        key: TenderStepperKeys.Execution,
        disabled: false,
        visited: currentTender.status === TaskStatusesEnum.Started,
      },
      { order: 3, label: '??????????????????', key: TenderStepperKeys.Result, disabled: false },
    ],
    []
  );
  const [currentStep, setCurrentStep] = useState<TenderStepperKeys>(TenderStepperKeys.Info);

  const tenderItemName = DocumentItemNamesEnum.WaterSystemMaintenance;

  const formControls = useForm<WaterSystemMaintenanceFormValues>({
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
      canCancelService: !currentTender?.items?.find(item => item.type === tenderItemName).properties?.started,
      [tenderItemName]: currentTender?.items?.find(item => item.type === tenderItemName),
      itemAdditionalInfo: currentTender?.items?.find(item => item.type === tenderItemName)?.additionalInfo,
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

  useEffect(() => {
    getDictionaryItemsByType('80').then(() => setCurrentOptions(waterSystemOptions));
  }, []);

  const additionalInfoSubmitHandler = useCallback(
    (input: string, type: DocumentItemNamesEnum) => {
      if (currentTender.items?.find(item => item.type === type)) {
        editItemOfDocument({ itemType: type, additionalInfo: input });
      } else {
        addPositionsToTender([
          {
            type: type,
            additionalInfo: input,
          },
        ]);
      }
    },
    [currentTender.items]
  );

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

  const handleWaterSystemType = useCallback(
    (currentValue: DocumentItemView, option: DocumentItemView, onChange: (value: DocumentItemView) => void) => {
      editItemOfDocument({
        referenceMasterCode: option.masterCode,
        id: currentValue.id,
      })
        .then(items => onChange(items.find(item => item.type === tenderItemName)))
        .then(() => console.log('Item after edit', watch(tenderItemName)));
    },
    []
  );

  const handleWaterSystemTimer = useCallback(() => {
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
              <InlineAlert type="danger">?????????? ???????????????????? ???? ????????????, ?????????????? ?????????????? ????????????</InlineAlert>
            ) : null}

            {errors.forcedDownTime ? (
              <InlineAlert type="danger">
                ?????????? ???????????? ???????????????????????? ?????????????? ??????????????, ?????????????? ???????????????? ???????????? ???????????????????????? ????????????????
              </InlineAlert>
            ) : null}

            {errors[tenderItemName] ? (
              <InlineAlert type="danger">
                ?????????? ?????????????????? ?? ?????????????? ?? ????????????????????, ?????????????? ???????????????? ???????????????????? ?????? ?????????? ???? ????????????
              </InlineAlert>
            ) : null}

            <FormGroup>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                name="garageNumberOfSpecialEquipment"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="???????????????? ?????????? ??????????????????????"
                    value={value}
                    onChangeText={onChange}
                    onBlur={() =>
                      additionalInfoSubmitHandler(value, DocumentItemNamesEnum.GarageNumberOfSpecialEquipment)
                    }
                  />
                )}
              />
            </FormGroup>

            <FormGroup>
              <Controller
                control={control}
                rules={{
                  required: false,
                }}
                name={tenderItemName}
                render={({ field: { onChange, value } }) => (
                  <Select
                    disabled={value.properties?.started && !value.properties?.completed}
                    value={value}
                    valueStyle={{ color: colors.black }}
                    label={'??????'}
                    items={waterSystemOptions}
                    onSelect={(option: DocumentItemView) => handleWaterSystemType(value, option, onChange)}
                  />
                )}
              />
            </FormGroup>

            {watch(tenderItemName).masterCode === 'WSMOther' && (
              <FormGroup>
                <Controller
                  control={control}
                  rules={{
                    required: false,
                  }}
                  name="itemAdditionalInfo"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      label="????????????????????"
                      value={value}
                      onChangeText={onChange}
                      onBlur={() => additionalInfoSubmitHandler(value, tenderItemName)}
                    />
                  )}
                />
              </FormGroup>
            )}

            {ForcedDownTimeControls}

            <Divider />

            <FormGroup>
              <Text style={fonts.paragraphSemibold}>????????????????????</Text>
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
                      onPress={handleWaterSystemTimer}
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

        {currentStep === TenderStepperKeys.Result && <WaterSystemMaintenanceReport />}
      </ScrollViewContainer>
    </>
  );
};

export default observer(WaterSystemMaintenanceScreen);

const styles = StyleSheet.create({
  labelContainer: {
    ...layout.rowSpaceBetween,
    marginBottom: 15,
  },
  label: {
    ...fonts.paragraphRegular,
    flexShrink: 1,
  },
  optionContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingVertical: 24,
    marginBottom: 24,
  },
});
