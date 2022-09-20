import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { WeatherLabel } from '../../components/Labels';
import { TaskStepper } from '../../components/Tasks';
import { TouchableLabel } from '../../ui-kit/Labels';
import { SimpleList } from '../../ui-kit/Lists';
import { PooAgentScreenProps } from '../../navigation/props';
import { PooAgentReportEn, PooAgentReportRu } from './components';
import Paper from '../../ui-kit/Paper';
import Tab from '../../ui-kit/Tab';
import IconRadioButton from '../../ui-kit/IconRadionButton';
import Icon from '../../ui-kit/Icon';
import SpinnerLoading from '../../ui-kit/SpinnerLoading';

import { PooStackScreens } from '../../navigation/enums';
import {
  TaskStatusesEnum,
  TaskStepSchema,
  TreatmentStagesEnum,
  TreatmentTypesEnum,
  WeatherEnum,
} from '../../services/data';
import { useTreatmentsStore } from '../../store/hooks';
import { useFormik } from 'formik';
import { formatTreatmentTypeForLabel } from '../../utils/treatments';
import Icons from '../../ui-kit/Icon/types';
import { observer } from 'mobx-react-lite';
import { PooAgentStepperKeys, TREATMENT_NAMES, TREATMENT_STAGE_NAMES, WEATHER_NAMES } from '../../utils';
import { useFocusEffect } from '@react-navigation/core';

const stepperSteps: TaskStepSchema[] = [
  { order: 1, label: 'Текущие условия', key: PooAgentStepperKeys.CurrentConditions, disabled: false },
  { order: 2, label: 'Тип ПОО', key: PooAgentStepperKeys.TreatmentType, disabled: false },
  { order: 3, label: 'Результат', key: PooAgentStepperKeys.Result, disabled: false },
];

const weatherButtons = [
  { label: WEATHER_NAMES.Foggy, value: WeatherEnum.Foggy, icon: 'foggyWeather' },
  { label: WEATHER_NAMES.Rainy, value: WeatherEnum.Rainy, icon: 'rainyWeather' },
  { label: WEATHER_NAMES.Snowy, value: WeatherEnum.Snowy, icon: 'snowyWeather' },
];

const pooButtons = [
  {
    label: TREATMENT_NAMES.WingTop,
    value: TreatmentTypesEnum.WingTop,
    icon: 'airplaneWingTopHighlighted',
  },
  {
    label: TREATMENT_NAMES.StabilizerTop,
    value: TreatmentTypesEnum.StabilizerTop,
    icon: 'airplaneStabilizerTopHighlighted',
  },
  { label: TREATMENT_NAMES.Keel, value: TreatmentTypesEnum.Keel, icon: 'airplaneKeelHighlighted' },
  {
    label: TREATMENT_NAMES.Fuselage,
    value: TreatmentTypesEnum.Fuselage,
    icon: 'airplaneFuselageHighlighted',
  },
  {
    label: TREATMENT_NAMES.WingBottom,
    value: TreatmentTypesEnum.WingBottom,
    icon: 'airplaneWingBottomHighlighted',
  },
  {
    label: TREATMENT_NAMES.StabilizerBottom,
    value: TreatmentTypesEnum.StabilizerBottom,
    icon: 'airplaneStabilizerBottomHighlighted',
  },
];

export interface DeicingTreatmentFormValues {
  weatherType: WeatherEnum;
  treatmentType: TreatmentTypesEnum;
  threatmentStage: TreatmentStagesEnum;
  stageConcentration: string;
  firstTitle: string;
  liquidType: string;
  percent: number;
  secondTitle: string;
  status: TaskStatusesEnum;
}

const PooAgentScreen: FC<PooAgentScreenProps> = ({ navigation, route }) => {
  const { id, updateAfterDone } = route.params;
  const { loading, deicingTreatment, getDeicingTreamentById, syncDeicingTreatmentFormValues } = useTreatmentsStore();
  const [currentStep, setCurrentStep] = useState<PooAgentStepperKeys>(PooAgentStepperKeys.CurrentConditions);

  const { values, setFieldValue } = useFormik<DeicingTreatmentFormValues>({
    initialValues: {
      weatherType: null,
      treatmentType: null,
      threatmentStage: null,
      stageConcentration: '30:70',
      firstTitle: 'PRIMER',
      liquidType: 'IV',
      percent: 100,
      secondTitle: 'PRIMER2',
      status: updateAfterDone ? deicingTreatment?.status : TaskStatusesEnum.Pending,
    },
    onSubmit: () => {},
  });

  useFocusEffect(
    useCallback(() => {
      setCurrentStep(PooAgentStepperKeys.CurrentConditions);
    }, [])
  );

  useEffect(() => {
    setFieldValue('status', updateAfterDone ? deicingTreatment?.status : TaskStatusesEnum.Pending);
    setFieldValue('weatherType', deicingTreatment?.weatherType);
    setFieldValue('treatmentType', deicingTreatment?.treatmentType);
    setFieldValue('threatmentStage', deicingTreatment?.threatmentStage);

    getDeicingTreamentById({
      treatmentId: id,
      cityId: 473021,
    });
  }, []);

  useEffect(() => {
    syncDeicingTreatmentFormValues(values);
  }, [values]);

  useEffect(() => {
    navigation.setOptions({
      cardStyle: {
        backgroundColor: values.threatmentStage === TreatmentStagesEnum.TwoStages ? colors.transparent : colors.white,
      },
    });
  }, [values.threatmentStage]);

  const handleMoveNext = () => {
    if (!values.weatherType) return;

    const currentIdx = stepperSteps.findIndex(step => step.key === currentStep);

    if (currentIdx + 1 < stepperSteps.length) {
      if (currentStep === PooAgentStepperKeys.CurrentConditions && !values.treatmentType) {
        setCurrentStep(PooAgentStepperKeys.Result);
      } else {
        setCurrentStep(stepperSteps[currentIdx + 1].key as PooAgentStepperKeys);
      }
    } else {
      navigation.navigate(PooStackScreens.PooSign, {
        id,
      });
    }
  };

  if (loading) return <SpinnerLoading />;

  return (
    <>
      <TaskStepper steps={stepperSteps} currentKey={currentStep} />

      <ContainerWithButton
        buttonLabel={currentStep === PooAgentStepperKeys.Result ? 'Получить подпись заказчика' : 'Далее'}
        scrollViewProps={{
          contentContainerStyle: {
            padding: 0,
          },
        }}
        onButtonPress={handleMoveNext}
      >
        {currentStep === PooAgentStepperKeys.CurrentConditions && (
          <View>
            <View style={{ paddingHorizontal: 20 }}>
              <WeatherLabel degree={deicingTreatment?.temperature} />
            </View>

            <IconRadioButton.Group
              value={values.weatherType}
              onChange={(value: WeatherEnum) => setFieldValue('weatherType', value)}
            >
              {weatherButtons.map(item => (
                <IconRadioButton
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  icon={<Icon name={item.icon as keyof Icons} />}
                />
              ))}
            </IconRadioButton.Group>

            <View style={{ padding: 20 }}>
              <Text style={fonts.subtitleSemibold}>Выбор ПОО</Text>
            </View>

            <IconRadioButton.Group
              inARowCount={2}
              value={values.treatmentType}
              onChange={(value: TreatmentTypesEnum) => setFieldValue('treatmentType', value)}
            >
              {pooButtons.map(item => (
                <IconRadioButton
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  icon={<Icon name={item.icon as keyof Icons} />}
                />
              ))}
            </IconRadioButton.Group>
          </View>
        )}

        {currentStep === PooAgentStepperKeys.TreatmentType && (
          <View>
            <View style={{ padding: 20, backgroundColor: colors.white }}>
              <Text style={fonts.subtitleSemibold}>ПОО {formatTreatmentTypeForLabel(values.treatmentType)}</Text>
            </View>

            <IconRadioButton.Group
              inARowCount={2}
              value={values.threatmentStage}
              onChange={(value: TreatmentStagesEnum) => setFieldValue('threatmentStage', value)}
            >
              <IconRadioButton
                label={TREATMENT_STAGE_NAMES[TreatmentStagesEnum.OneStage]}
                value={TreatmentStagesEnum.OneStage}
              />
              <IconRadioButton
                label={TREATMENT_STAGE_NAMES[TreatmentStagesEnum.TwoStages]}
                value={TreatmentStagesEnum.TwoStages}
              />
            </IconRadioButton.Group>

            {values.threatmentStage && (
              <Paper
                title={values.threatmentStage === TreatmentStagesEnum.TwoStages ? '1 этап' : null}
                titleStyle={fonts.paragraphSemibold}
              >
                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Концентрация раствора (Type I : Вода)</Text>

                  <TouchableLabel>{values.stageConcentration}</TouchableLabel>
                </View>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Наименование</Text>

                  <TouchableLabel>{values.firstTitle}</TouchableLabel>
                </View>
              </Paper>
            )}

            {values.threatmentStage === TreatmentStagesEnum.TwoStages && (
              <Paper title="2 этап" titleStyle={fonts.paragraphSemibold}>
                <SimpleList style={{ marginBottom: 20 }}>
                  <SimpleList.Item title="Тип жидкости" value={values.liquidType} />
                  <SimpleList.Item title="Процент" value={values.percent?.toString()} />
                </SimpleList>

                <View style={styles.labelContainer}>
                  <Text style={styles.label}>Наименование</Text>

                  <TouchableLabel>{values.secondTitle}</TouchableLabel>
                </View>
              </Paper>
            )}
          </View>
        )}

        {currentStep === PooAgentStepperKeys.Result && (
          <View>
            <Tab sceneContainerStyle={{ backgroundColor: colors.transparent }}>
              <Tab.Item name="Ru" component={PooAgentReportRu} />
              <Tab.Item name="En" component={PooAgentReportEn} />
            </Tab>
          </View>
        )}
      </ContainerWithButton>
    </>
  );
};

export default observer(PooAgentScreen);

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
