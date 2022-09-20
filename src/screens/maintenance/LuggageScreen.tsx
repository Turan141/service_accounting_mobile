import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { fonts } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup, ImagePicker } from '../../ui-kit/Forms';

import { useFormik } from 'formik';
import TextInput from '../../ui-kit/TextInput';
import { SimpleList } from '../../ui-kit/Lists';

interface LuggageFormValues {
  weight: number;
  places: number;
  additionalInfo: string;
}

const LuggageScreen: FC = () => {
  const { values, handleChange } = useFormik<LuggageFormValues>({
    initialValues: {
      weight: null,
      places: null,
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Прилёт">
      <FormGroup>
        <TextInput
          label="Масса"
          value={values.weight?.toString()}
          onChangeText={handleChange('weight')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput
          label="Мест"
          value={values.places?.toString()}
          onChangeText={handleChange('places')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup style={{ marginTop: 10, marginBottom: 20 }}>
        <ImagePicker label="Фото поврежденного багажа" />
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

export default LuggageScreen;

const styles = StyleSheet.create({});
