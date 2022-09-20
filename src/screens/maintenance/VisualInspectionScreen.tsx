import React, { FC, Fragment, useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { TaskStepper } from '../../components/Tasks';
import { ContainerWithButton } from '../../ui-kit/Containers';
import { ImagePicker } from '../../ui-kit/Forms';
import Divider from '../../ui-kit/Divider';

import { ImageAsset, TaskStepSchema } from '../../services/data';
import { useNavigation } from '@react-navigation/native';
import Paper from '../../ui-kit/Paper';
import { SimpleList } from '../../ui-kit/Lists';
import { useFormik } from 'formik';
import { MaintenanceScreenNavigationProp } from '../../navigation/props';
import { colors } from '../../theme';
import ImagesPreview from '../../components/ImagesPreview';

const stepperSteps: TaskStepSchema[] = [
  { order: 1, label: 'Внешний осмотр', key: 'visualInspection' },
  { order: 2, label: 'Подтверждение внешнего осмотра', key: 'confirmVisualInspection' },
];

const imagePickers = [
  { label: 'Люки БГО', key: 'bgoLukes' },
  { label: 'Двери', key: 'doors' },
  { label: 'Фюзеляж', key: 'fuselage' },
  { label: 'Крыло', key: 'wing' },
  { label: 'СУ', key: 'su' },
  { label: 'Шасси', key: 'chassis' },
  { label: 'Иное', key: 'other' },
];

interface VisualInspectionFormValues {
  bgoLukes: ImageAsset[];
  doors: ImageAsset[];
  fuselage: ImageAsset[];
  wing: ImageAsset[];
  su: ImageAsset[];
  chassis: ImageAsset[];
  other: ImageAsset[];
}

const VisualInpectionScreen: FC = () => {
  const navigation = useNavigation<MaintenanceScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(stepperSteps[0].key);

  useEffect(() => {
    console.log({
      currentStep,
    });

    navigation.setOptions({
      cardStyle: {
        backgroundColor: currentStep === 'visualInspection' ? colors.white : null,
      },
    });
  }, [currentStep]);

  const handleGenerateReport = useCallback(
    (values: VisualInspectionFormValues) => {
      console.log({
        values,
      });

      if (currentStep === 'visualInspection') setCurrentStep('confirmVisualInspection');
    },
    [currentStep]
  );

  const { values, setFieldValue, handleSubmit } = useFormik<VisualInspectionFormValues>({
    initialValues: {
      bgoLukes: [],
      doors: [],
      fuselage: [],
      wing: [],
      su: [],
      chassis: [],
      other: [],
    },
    onSubmit: handleGenerateReport,
  });

  const getButtonLabel = useCallback(() => {
    switch (currentStep) {
      case 'visualInspection':
        return 'Сформировать отчет';

      case 'confirmVisualInspection':
        return 'Сохранить';

      default:
        return 'Введите текст кнопки';
    }
  }, [currentStep, stepperSteps]);

  return (
    <>
      <TaskStepper steps={stepperSteps} currentKey={currentStep} />
      <ContainerWithButton
        buttonLabel={getButtonLabel()}
        onButtonPress={handleSubmit}
        scrollViewProps={{
          contentContainerStyle: {
            padding: currentStep !== 'visualInspection' ? 0 : 20,
          },
        }}
      >
        {currentStep === 'visualInspection' ? (
          imagePickers.map(({ label, key }, idx) => (
            <Fragment key={key}>
              <ImagePicker label={label} onSelect={(images: ImageAsset[]) => setFieldValue(key, images)} />

              {idx !== imagePickers.length - 1 && <Divider />}
            </Fragment>
          ))
        ) : (
          <>
            <Paper title="Итог:">
              <SimpleList>
                <SimpleList.Item
                  title="Время начала:"
                  value="23.06.2021 в 15:10"
                  hideBorder
                  containerStyle={{ paddingBottom: 0 }}
                />
                <SimpleList.Item title="Время окончания:" value="23.06.2021 в 15:20" hideBorder />
              </SimpleList>
            </Paper>

            <Paper>
              {imagePickers.map(({ label, key }, idx) => {
                if (values[key].length > 0) {
                  return (
                    <Fragment key={key}>
                      <ImagesPreview title={label} items={values[key]} />

                      {idx !== imagePickers.length - 1 && <Divider />}
                    </Fragment>
                  );
                }
              })}
            </Paper>
          </>
        )}
      </ContainerWithButton>
    </>
  );
};

export default VisualInpectionScreen;

const styles = StyleSheet.create({});
