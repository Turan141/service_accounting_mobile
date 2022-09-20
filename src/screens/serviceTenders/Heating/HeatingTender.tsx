import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TaskStatusesEnum, TaskStepSchema } from '../../../services/data';
import { observer } from 'mobx-react-lite';
import { TenderStepperKeys } from '../../../utils/constants/serviceTenders';
import { ScrollViewContainer } from '../../../ui-kit/Containers';
import { TaskStepper } from '../../../components/Tasks';
import fonts from '../../../theme/fonts';
import colors from '../../../theme/colors';
import layout from '../../../theme/layout';
import { Select } from '../../../ui-kit/Selects';
import Switch from '../../../ui-kit/Switch';
import Divider from '../../../ui-kit/Divider';
import { AddMoreButton, Button } from '../../../ui-kit/Buttons';
import TextInput from '../../../ui-kit/TextInput';
import { FormGroup } from '../../../ui-kit/Forms';
import TimerWork from '../../../components/TimerWork/TimerWork';
import { TenderScreenProps } from '../../../navigation/props';
import { InlineAlert } from '../../../ui-kit/Alerts';
import { useDictionariesStore, useTendersStore } from '../../../store/hooks';
import { DocumentItemDto, DocumentItemView } from '../../../typings/swagger/api';
import { TASKS_STACK } from '../../../navigation/stacks';
import { DocumentItemNamesEnum } from '../../../store/data/documents';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import _ from 'lodash';
import HeatingTenderReport from './HeatingTenderReport';
import useForcedDowntime from '../../../hooks/useForcedDowntime';
import TenderInfo from '../TenderInfo';
import { logToConsole } from '../../../utils/formatting';

export enum HeatingSpotsNameEnum {
  salon = 'salon',
  engine = 'engine',
  winMechanization = 'winMechanization',
  chassis = 'chassis',
  waterSystemControlPanel = 'waterSystemControlPanel',
  toiletSystemControlPanel = 'toiletSystemControlPanel',
  other = 'other',
}

export interface HeatingTenderFormValues {
  garageNumberOfSpecialEquipment: string;
  heatingSpots: DocumentItemView[];
  forcedDownTime: DocumentItemView | boolean;
  forcedDownTimeAdditionalInfo: string;
  serviceCancellation: boolean;
  status: TaskStatusesEnum;
  additionalInfo: string;
  serviceCancellationReason: string;
}

const HeatingTenderScreen: FC<TenderScreenProps> = ({ navigation }) => {
  const {
    currentTender,
    addPositionsToTender,
    editItemOfDocument,
    cancelService,
    changeItemStatus,
    deletePositionsOfTender,
    loading,
  } = useTendersStore();
  const { heatingSpots, getDictionaryItemsByType } = useDictionariesStore();

  const stepperSteps: TaskStepSchema[] = useMemo(
    () => [
      { order: 1, label: 'Информация', key: TenderStepperKeys.Info, disabled: false, visited: true },
      {
        order: 2,
        label: 'Подогрев ВС',
        key: TenderStepperKeys.Execution,
        disabled: false,
        visited: currentTender.status === TaskStatusesEnum.Started,
      },
      { order: 3, label: 'Результат', key: TenderStepperKeys.Result, disabled: false },
    ],
    []
  );

  const [currentStep, setCurrentStep] = useState<TenderStepperKeys>(TenderStepperKeys.Info);

  const formControls = useForm<HeatingTenderFormValues>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      garageNumberOfSpecialEquipment: currentTender.items?.find(
        item => item.type === DocumentItemNamesEnum.GarageNumberOfSpecialEquipment
      )?.additionalInfo,
      heatingSpots: currentTender?.items?.filter(item => item.type === DocumentItemNamesEnum.HeatingPoint),
      forcedDownTime: currentTender?.items?.find(item => item.type === DocumentItemNamesEnum.ForcedDownTime),
      forcedDownTimeAdditionalInfo: currentTender?.items?.find(
        item => item.type === DocumentItemNamesEnum.ForcedDownTime
      )?.additionalInfo,
      serviceCancellation: false,
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

  const { fields, append, update } = useFieldArray<DocumentItemView>({
    control,
    name: 'heatingSpots',
    keyName: 'key' as 'id',
  });

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

    const itemIdsToDelete = [];
    for (const [index, item] of values.heatingSpots.entries()) {
      if (item.status === TaskStatusesEnum.Started) {
        logToConsole(item.title);
        const resultItem = await changeItemStatus(TaskStatusesEnum.Completed, undefined, item?.id);
        update(index, resultItem);
      }
      if (_.isEmpty(item.properties)) {
        itemIdsToDelete.push(item.id);
      }
    }
    if (itemIdsToDelete.length > 0) {
      await deletePositionsOfTender(itemIdsToDelete);
    }

    setCurrentStep(TenderStepperKeys.Result);
  };

  useEffect(() => {
    getDictionaryItemsByType('70');
  }, []);

  const { ForcedDownTimeControls } = useForcedDowntime(formControls);

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

  const canCancelService = useMemo(() => {
    if (fields.length === 0) {
      return true;
    }
    const fieldsEmptiness = fields.map(item => {
      return _.isEmpty(item.properties);
    });
    return !fieldsEmptiness.includes(false);
  }, [fields]);

  const handleHeatingSpotTimer = (index: number) => {
    const item = watch('heatingSpots')[index];
    if (!item?.properties?.started) {
      changeItemStatus(TaskStatusesEnum.Started, undefined, item?.id).then(item => {
        update(index, item);
        setValue('canCancelService', false);
        clearErrors('heatingSpots');
      });
    } else if (item?.properties?.started && !item?.properties?.completed) {
      changeItemStatus(TaskStatusesEnum.Completed, undefined, item?.id).then(item => {
        update(index, item);
        clearErrors('heatingSpots');
      });
    }
  };

  const calculateTime = useCallback((item: DocumentItemView) => {
    if (item.properties?.started && item.properties?.completed) {
      return +item.properties?.completed - +item.properties?.started;
    }
    if (item.properties?.started && !item.properties?.completed) {
      return Date.now() - +item.properties?.started;
    }
    return 0;
  }, []);

  const handleChangeHeatingSpot = useCallback(
    async (currentValue: DocumentItemView, spot: DocumentItemView, index: number) => {
      console.log('item to be changed ', currentValue);
      if (!_.isEmpty(currentValue)) {
        console.log('we edit the item -> ');
        editItemOfDocument({
          referenceMasterCode: spot.masterCode,
          id: currentValue.id,
        })
          .then(items =>
            update(
              index,
              items.find(
                item =>
                  item.masterCode === spot.masterCode && currentValue.properties.started == item.properties.started
              )
            )
          )
          .then(() => console.log('Items after edit', watch('heatingSpots')));
      } else {
        console.log('then we add this item -> ');
        addPositionsToTender([
          { type: DocumentItemNamesEnum.HeatingPoint, referenceMasterCode: spot.masterCode },
        ] as DocumentItemDto[])
          .then(items => {
            update(
              index,
              items.find(item => item.masterCode === spot.masterCode && _.isEmpty(item.properties))
            );
          })
          .then(() => console.log('Items after adding', watch('heatingSpots')));
      }
    },
    []
  );

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
                Чтобы начать Подогрев ВС, сначала отожмите кнопку «Вынужденный простой»
              </InlineAlert>
            ) : null}

            {errors.heatingSpots ? (
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
                name="garageNumberOfSpecialEquipment"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    label="Гаражный номер спецтехники"
                    value={value}
                    onChangeText={onChange}
                    onBlur={() =>
                      additionalInfoSubmitHandler(value, DocumentItemNamesEnum.GarageNumberOfSpecialEquipment)
                    }
                  />
                )}
              />
            </FormGroup>

            {ForcedDownTimeControls}

            <View
              style={{ backgroundColor: '#F4F7FC', marginHorizontal: -20, paddingHorizontal: 0, paddingVertical: 12 }}
            >
              {fields.map((item, index) => {
                return (
                  <Controller
                    control={control}
                    name={`heatingSpots.${index}`}
                    key={`heating-spot-${item.masterCode}-${index}`}
                    render={({ field: { value } }) => {
                      return (
                        <View style={styles.optionContainer}>
                          <Select
                            disabled={value.properties?.started && !value.properties?.completed}
                            value={value}
                            valueStyle={{ color: colors.black }}
                            label={'Точка обогрева'}
                            items={heatingSpots}
                            onSelect={(spot: DocumentItemView) => handleChangeHeatingSpot(value, spot, index)}
                          />
                          {value.masterCode && (
                            <TimerWork
                              completed={!!value.properties?.completed}
                              disabled={
                                watch('forcedDownTime')?.properties?.started &&
                                !watch('forcedDownTime')?.properties?.completed
                              }
                              time={calculateTime(value)}
                              onPress={() => handleHeatingSpotTimer(index)}
                              style={{ marginTop: 24 }}
                            />
                          )}
                        </View>
                      );
                    }}
                  />
                );
              })}
            </View>
            <View style={{ marginTop: 24 }}>
              <AddMoreButton
                onPress={() => {
                  append({});
                }}
              />
            </View>
            <Divider />
            {canCancelService && (
              <>
                <View
                  style={{
                    paddingBottom: 24,
                  }}
                >
                  <Controller
                    control={control}
                    rules={{
                      required: false,
                    }}
                    name="serviceCancellation"
                    render={({ field: { onChange, value } }) => (
                      <Switch
                        labelStyle={fonts.paragraphSemibold}
                        label="Отказ от услуги"
                        value={value}
                        onChange={event => {
                          clearErrors('heatingSpots');
                          onChange(event);
                        }}
                      />
                    )}
                  />
                </View>
                {watch('serviceCancellation') && (
                  <FormGroup>
                    <Controller
                      control={control}
                      rules={{
                        required: watch('serviceCancellation'),
                      }}
                      name="serviceCancellationReason"
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          label={'Причина отказа'}
                          value={value}
                          onChangeText={onChange}
                          status={errors.serviceCancellationReason ? 'error' : 'default'}
                        />
                      )}
                    />
                  </FormGroup>
                )}
              </>
            )}
            <Button
              loading={loading}
              onPress={handleSubmit(handleMoveNext)}
              disabled={
                !(watch('forcedDownTime')?.properties?.completed || watch('serviceCancellation') || !canCancelService)
              }
              variant={'primary'}
            >
              {watch('serviceCancellation') && watch('forcedDownTime') === undefined
                ? 'Завершить'
                : 'Завершить и перейти к результату'}
            </Button>
          </View>
        )}

        {currentStep === TenderStepperKeys.Result && <HeatingTenderReport />}
      </ScrollViewContainer>
    </>
  );
};

export default observer(HeatingTenderScreen);

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
