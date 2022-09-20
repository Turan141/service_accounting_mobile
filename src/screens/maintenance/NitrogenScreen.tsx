import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { fonts } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';

interface NitrogenFormValues {
  garageRoom: number;
  fillingPointsNumber: number;
  additionalInfo: string;
}

const NitrogenScreen: FC = () => {
  const { values, handleChange } = useFormik<NitrogenFormValues>({
    initialValues: {
      garageRoom: 2,
      fillingPointsNumber: 15,
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Прилет">
      <FormGroup>
        <TextInput
          label="Гаражный номер"
          value={values.garageRoom?.toString()}
          onChangeText={handleChange('garageRoom')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput
          label="Количество точек заправки"
          value={values.fillingPointsNumber?.toString()}
          onChangeText={handleChange('fillingPointsNumber')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup style={{ marginTop: 10 }}>
        <TextInput
          label="Дополнительная информация"
          value={values.additionalInfo}
          onChangeText={handleChange('additionalInfo')}
        />
      </FormGroup>
    </ContainerWithButton>
  );
};

export default NitrogenScreen;

const styles = StyleSheet.create({});
