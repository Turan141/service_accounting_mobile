import React, { FC, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { FormGroup, ImagePicker } from '../../ui-kit/Forms';
import { Button } from '../../ui-kit/Buttons';
import { ContainerWithButton } from '../../ui-kit/Containers';
import { WeatherLabel } from '../../components/Labels';
import { TaskStepper } from '../../components/Tasks';
import { InlineAlert } from '../../ui-kit/Alerts';
import Icon from '../../ui-kit/Icon';
import TextInput from '../../ui-kit/TextInput';
import Switch from '../../ui-kit/Switch';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';

import { PooTransportEmployeeScreenProps } from '../../navigation/props';
import { useFormik } from 'formik';
import { useTreatmentsStore, useUserStore } from '../../store/hooks';
import { PooWorkerInCarStepperKeys, TREATMENT_NAMES, WEATHER_NAMES } from '../../utils';
import { observer } from 'mobx-react';
import { WorkTypesEnum } from '../../store/UserStore';
import { ImageAsset, TaskStatusesEnum, TaskStepSchema } from '../../services/data';
import * as Yup from 'yup';
import { TASKS_STACK } from '../../navigation/stacks';
import { TasksStackScreens } from '../../navigation/enums';
import { useStepper } from '../../hooks';

interface PooResultsFormValues {
  spentWater: number;
  spentLiquidOne: number;
  spentLiquidFour: number;
  receiptPhotos: ImageAsset[];
  isPooProcedureCorrect: boolean;
  isAfterPooCheckDone: boolean;
}

const PooResultsValidationSchema: Yup.SchemaOf<PooResultsFormValues> = Yup.object()
  .shape({
    spentWater: Yup.number().required(),
    spentLiquidOne: Yup.number().required(),
    spentLiquidFour: Yup.number().required(),
    receiptPhotos: Yup.array().nullable(),
    isPooProcedureCorrect: Yup.bool().oneOf([true]),
    isAfterPooCheckDone: Yup.bool().oneOf([true]),
  })
  .defined();

const PooTrasportEmployeeScreen: FC<PooTransportEmployeeScreenProps> = ({ navigation, route }) => {
  const { deicingTreatmentId } = route.params;
  const { workType } = useUserStore();
  const {
    controlLoading,
    loading,
    deicingTreatment,
    getDeicingTreamentById,
    startDeicingTreament,
    updateDeicingTreament,
    stopDeicingTreament,
  } = useTreatmentsStore();
  const stepperSteps: TaskStepSchema[] = [
    {
      order: 1,
      label: 'Текущие условия',
      key: PooWorkerInCarStepperKeys.CurrentConditions,
      disabled: workType === WorkTypesEnum.Report,
    },
    {
      order: 2,
      label: 'Результат',
      key: PooWorkerInCarStepperKeys.Result,
      disabled: workType === WorkTypesEnum.Treatment,
    },
  ];
  const { activeStep, isLastStep, setActiveStep, moveStep } = useStepper({
    steps: stepperSteps,
    onFinishCb: () => handleFinish(),
  });

  useEffect(() => {
    if (workType === WorkTypesEnum.Report) {
      setActiveStep(PooWorkerInCarStepperKeys.Result);
    } else {
      setActiveStep(PooWorkerInCarStepperKeys.CurrentConditions);
    }

    getDeicingTreamentById({
      treatmentId: deicingTreatmentId,
      cityId: 473021,
    });
  }, []);

  useEffect(() => {
    if (activeStep === PooWorkerInCarStepperKeys.Result) {
      navigation.setOptions({
        title: 'ПОО итоги',
      });
    }
  }, [activeStep]);

  const runUpdateDeicingTreatment = async (values: PooResultsFormValues) => {
    await updateDeicingTreament({
      ...deicingTreatment,
      treatmentCompleted: values.isAfterPooCheckDone,
      treatmentIsChecked: values.isPooProcedureCorrect,
      images: values.receiptPhotos.map(img => ({
        url: img.base64,
        comment: img.comment,
      })),
      spentWater: values.spentWater,
      spentLiquidOne: values.spentLiquidOne,
      spentLiquidFour: values.spentLiquidFour,
    });

    navigation.navigate(TASKS_STACK as any, {
      screen: TasksStackScreens.Tasks,
    });
  };

  const handleFinish = async () => {
    if (!stepperSteps[1].disabled) {
      await PooResultsValidationSchema.validate(values, {
        abortEarly: false,
      })
        .then(async values => {
          runUpdateDeicingTreatment(values);
        })
        .catch((error: Yup.ValidationError) => {
          error.inner.forEach(innerError => {
            setFieldError(innerError.path, innerError.message);
          });
        });
    } else {
      runUpdateDeicingTreatment(values);
    }
  };

  const { values, errors, handleChange, handleSubmit, setFieldValue, setFieldError } = useFormik<PooResultsFormValues>({
    initialValues: {
      spentWater: null,
      spentLiquidOne: null,
      spentLiquidFour: null,
      receiptPhotos: [],
      isAfterPooCheckDone: false,
      isPooProcedureCorrect: false,
    },
    onSubmit: moveStep,
  });

  if (loading) return <SpinnerLoading />;

  return (
    <>
      <TaskStepper steps={stepperSteps} currentKey={activeStep} />

      <ContainerWithButton
        buttonLabel={isLastStep ? 'Сохранить' : 'Далее'}
        scrollViewProps={{
          contentContainerStyle: {
            padding: 0,
          },
        }}
        onButtonPress={handleSubmit}
        buttonProps={{
          loading: controlLoading,
        }}
      >
        {activeStep === PooWorkerInCarStepperKeys.CurrentConditions && (
          <View>
            <View style={{ paddingHorizontal: 20 }}>
              <WeatherLabel
                degree={deicingTreatment?.temperature}
                extended
                condition={WEATHER_NAMES[deicingTreatment?.weatherType]}
              />

              <View
                style={{
                  paddingVertical: 30,
                }}
              >
                <View
                  style={{
                    ...layout.rowAlignItemsCenter,
                    paddingVertical: 20,
                    borderTopWidth: 0.5,
                    borderBottomWidth: 0.5,
                    borderColor: colors.gray.primary,
                  }}
                >
                  <View style={layout.alignCenter}>
                    <Icon name="airplaneWingTopHighlighted" />
                    <Text style={{ ...fonts.paragraphRegular, marginTop: 15 }}>
                      {TREATMENT_NAMES[deicingTreatment?.treatmentType]}
                    </Text>
                  </View>

                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={{ ...fonts.paragraphSemibold, marginBottom: 20 }}>1-ступенчатая</Text>

                    <View style={layout.rowSpaceBetween}>
                      <Text style={fonts.paragraphRegular}>{`Type ${deicingTreatment?.liquidType}: Вода`}</Text>
                      <Text style={fonts.paragraphSemibold}>{deicingTreatment?.stageConcentration}</Text>
                    </View>
                  </View>
                </View>

                {deicingTreatment?.status === TaskStatusesEnum.Pending ||
                deicingTreatment?.status === TaskStatusesEnum.InProgress ? (
                  <View style={{ ...layout.rowSpaceBetween, marginTop: 25 }}>
                    <Text style={{ ...fonts.paragraphRegular, flexGrow: 1 }}>Таймер</Text>

                    <View style={{ flexBasis: '30%' }}>
                      <Button
                        loading={controlLoading}
                        compact
                        onPress={() => {
                          if (deicingTreatment?.status === TaskStatusesEnum.Pending) {
                            startDeicingTreament(deicingTreatmentId);
                          } else {
                            stopDeicingTreament(deicingTreatmentId);
                          }
                        }}
                      >
                        {deicingTreatment?.status === TaskStatusesEnum.Pending ? 'Старт' : 'Стоп'}
                      </Button>
                    </View>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        )}

        {activeStep === PooWorkerInCarStepperKeys.Result && (
          <View style={{ padding: 20, backgroundColor: colors.white }}>
            {errors.isAfterPooCheckDone ? (
              <InlineAlert type="danger">
                Подтвердите выполнение ПОО выбранной процедуре и выполнение проверки после ПОО
              </InlineAlert>
            ) : null}

            {errors.isPooProcedureCorrect ? (
              <InlineAlert type="danger">Подтвердите выполнение ПОО выбранной процедуре</InlineAlert>
            ) : null}

            <FormGroup>
              <TextInput
                label="Вода (л)"
                value={values.spentWater?.toString()}
                onChangeText={handleChange('spentWater')}
                status={errors.spentWater ? 'error' : 'default'}
                keyboardType="numeric"
              />
            </FormGroup>

            <FormGroup>
              <TextInput
                label="Тип I (л)"
                value={values.spentLiquidOne?.toString()}
                onChangeText={handleChange('spentLiquidOne')}
                status={errors.spentLiquidOne ? 'error' : 'default'}
                keyboardType="numeric"
              />
            </FormGroup>

            <FormGroup>
              <TextInput
                label="Тип IV (л)"
                value={values.spentLiquidFour?.toString()}
                onChangeText={handleChange('spentLiquidFour')}
                status={errors.spentLiquidFour ? 'error' : 'default'}
                keyboardType="numeric"
              />
            </FormGroup>

            <FormGroup>
              <ImagePicker
                label="Фото чека"
                onSelect={(images: ImageAsset[]) => setFieldValue('receiptPhotos', images)}
              />
            </FormGroup>

            <FormGroup style={{ borderTopWidth: 0.5, borderColor: colors.gray.primary, paddingVertical: 15 }}>
              <Switch
                label="ПОО  выполнена в соответствии с выбранной процедурой "
                value={values.isPooProcedureCorrect}
                onChange={() => setFieldValue('isPooProcedureCorrect', !values.isPooProcedureCorrect)}
              />
            </FormGroup>

            <FormGroup style={{ borderTopWidth: 0.5, borderColor: colors.gray.primary, paddingVertical: 15 }}>
              <Switch
                label="Проверка после проведения ПОО выполнена"
                value={values.isAfterPooCheckDone}
                onChange={() => setFieldValue('isAfterPooCheckDone', !values.isAfterPooCheckDone)}
              />
            </FormGroup>
          </View>
        )}
      </ContainerWithButton>
    </>
  );
};

export default observer(PooTrasportEmployeeScreen);

const styles = StyleSheet.create({
  labelContainer: {
    ...layout.rowSpaceBetween,
    marginBottom: 15,
  },
  label: {
    ...fonts.paragraphRegular,
    flexShrink: 1,
  },
});
