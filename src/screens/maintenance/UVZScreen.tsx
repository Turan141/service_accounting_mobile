import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';

interface UVZFormValues {
  tractorNumber: number;
  additionalInfo: string;
}

const UVZScreen: FC = () => {
  const { values, handleChange } = useFormik<UVZFormValues>({
    initialValues: {
      tractorNumber: null,
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Вылет">
      <FormGroup>
        <TextInput
          label="Тягач №"
          value={values.tractorNumber?.toString()}
          onChangeText={handleChange('tractorNumber')}
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

export default UVZScreen;

const styles = StyleSheet.create({});
