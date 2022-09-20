import React, { FC, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../theme';

import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';
import { useTreatmentsStore } from '../../store/hooks';
import { observer } from 'mobx-react-lite';
import * as Yup from 'yup';
import { PooSignScreenProps } from '../../navigation/props';
import { Button } from '../../ui-kit/Buttons';
import DrawingPanel from '../../components/DrawingPanel';

interface PooSignFormValues {
  signedPosition: string;
  signedFIO: string;
  signature: string;
}

const PooSignFormValidationSchema: Yup.SchemaOf<PooSignFormValues> = Yup.object().shape({
  signedPosition: Yup.string().required(),
  signedFIO: Yup.string().required(),
  signature: Yup.string().optional(),
});

const PooSignScreen: FC<PooSignScreenProps> = ({ navigation, route }) => {
  const { id } = route.params;
  const { controlLoading, updateDeicingTreament, deicingTreatmentFormValues } = useTreatmentsStore();

  const handleFinish = useCallback(async ({ signedFIO, signedPosition, signature }: PooSignFormValues) => {
    updateDeicingTreament({
      ...deicingTreatmentFormValues,
      id,
      isSigned: true,
      signedPosition,
      signedFIO,
      signImage: signature,
    });
  }, []);

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik<PooSignFormValues>({
    initialValues: {
      signedPosition: '',
      signedFIO: '',
      signature: '',
    },
    validationSchema: PooSignFormValidationSchema,
    onSubmit: handleFinish,
  });

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        padding: 20,
      }}
    >
      <View>
        <Text style={styles.hintText}>
          Оставляя свою подпись вы соглашаетесь с отчетом по рейсу как заказчик и подтверждаете, что Технологическая
          карта обслуживания ВС заполнена верно, и услуги были оказаны в полном объеме, и что вы не имеете претензий к
          исполнителю
        </Text>

        <FormGroup>
          <TextInput
            label="Должность"
            value={values.signedPosition}
            onChangeText={handleChange('signedPosition')}
            status={errors.signedPosition && touched.signedPosition ? 'error' : 'default'}
          />
        </FormGroup>

        <FormGroup>
          <TextInput
            label="ФИО"
            value={values.signedFIO}
            onChangeText={handleChange('signedFIO')}
            status={errors.signedFIO && touched.signedFIO ? 'error' : 'default'}
          />
        </FormGroup>

        <FormGroup style={{ alignItems: 'center' }}>
          <View
            style={{
              width: '100%',
              height: 230,
            }}
          >
            <DrawingPanel onDrawEnd={(img: string) => setFieldValue('signature', img)} />
          </View>
        </FormGroup>
      </View>

      <View style={styles.buttonContainer}>
        <Button onPress={handleSubmit} loading={controlLoading}>
          Сохранить
        </Button>
      </View>
    </View>
  );
};

export default observer(PooSignScreen);

const styles = StyleSheet.create({
  hintText: {
    ...fonts.smallRegular,
    color: colors.gray.primary,
    marginBottom: 15,
  },
  buttonContainer: {
    paddingVertical: 8,
    backgroundColor: colors.white,
    width: '100%',
  },
});
