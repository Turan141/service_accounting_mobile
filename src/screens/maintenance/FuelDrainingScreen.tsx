import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { fonts } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';

interface FuelDrainingFormValues {
  liters: number;
  additionalInfo: string;
}

const FuelDrainingScreen: FC = () => {
  const { values, handleChange } = useFormik<FuelDrainingFormValues>({
    initialValues: {
      liters: 2500,
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Вылет">
      <FormGroup>
        <TextInput
          label="Количество литров"
          value={values.liters?.toString()}
          onChangeText={handleChange('liters')}
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

export default FuelDrainingScreen;

const styles = StyleSheet.create({});
