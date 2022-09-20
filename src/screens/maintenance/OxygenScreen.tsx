import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import TextInput from '../../ui-kit/TextInput';

import { useFormik } from 'formik';
import { fonts } from '../../theme';
import { AddMoreButton } from '../../ui-kit/Buttons';

interface OxygenFormValues {
  garageRoom: number;
  liters: Array<{
    number: number;
  }>;
  additionalInfo: string;
}

const OxygenScreen: FC = () => {
  const { values, handleChange, setFieldValue } = useFormik<OxygenFormValues>({
    initialValues: {
      garageRoom: 2,
      liters: [{ number: 571 }, { number: 571 }],
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  const handleAddItem = useCallback(() => {
    setFieldValue('liters', [...values.liters, { number: null }]);
  }, [values]);

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

      {values.liters.map((item, idx) => (
        <FormGroup key={idx}>
          <Text style={styles.title}>Точка {idx + 1}</Text>
          <TextInput
            label="Литры"
            value={values.liters[idx]?.number?.toString()}
            onChangeText={handleChange(`liters[${idx}].number`)}
            keyboardType="numeric"
          />
        </FormGroup>
      ))}

      <AddMoreButton onPress={handleAddItem} />

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

export default OxygenScreen;

const styles = StyleSheet.create({
  title: {
    ...fonts.paragraphBold,
    marginVertical: 10,
  },
});
