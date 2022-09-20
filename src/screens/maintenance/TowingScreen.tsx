import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { fonts } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';

import { useFormik } from 'formik';
import TextInput from '../../ui-kit/TextInput';

interface TowingFormValues {
  tractorNumber: string;
  additionalInfo: string;
}

const TowingScreen: FC = () => {
  const { values, handleChange } = useFormik<TowingFormValues>({
    initialValues: {
      tractorNumber: '',
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Прилет">
      <FormGroup>
        <TextInput
          label="Тягач №"
          value={values.tractorNumber}
          onChangeText={handleChange('tractorNumber')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput
          label="Дополнительная информация"
          value={values.additionalInfo}
          onChangeText={handleChange('additionalInfo')}
        />
      </FormGroup>
    </ContainerWithButton>
  );
};

export default TowingScreen;

const styles = StyleSheet.create({});
