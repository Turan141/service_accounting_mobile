import { useFormik } from 'formik';
import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors, fonts, layout } from '../../theme';
import { Button } from '../../ui-kit/Buttons';
import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';
import Switch from '../../ui-kit/Switch';
import TextInput from '../../ui-kit/TextInput';

interface BathroomServiceFormValues {
  refuel: boolean;
  draining: boolean;
  complex: boolean;
  additionalInfo: string;
}

const BathroomServiceScreen: FC = () => {
  // TODO: Connect validation
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<BathroomServiceFormValues>({
    initialValues: {
      refuel: false,
      draining: false,
      complex: false,
      additionalInfo: '',
    },
    onSubmit: (values: BathroomServiceFormValues) => {
      console.log({
        values,
      });
    },
  });

  return (
    <ContainerWithButton onButtonPress={handleSubmit} label="Прилет">
      <View style={styles.listItem}>
        <Switch label="Заправка" value={values.refuel} onChange={() => setFieldValue('refuel', !values.refuel)} />
      </View>

      <View style={styles.listItem}>
        <Switch label="Слив" value={values.draining} onChange={() => setFieldValue('draining', !values.draining)} />
      </View>

      <View style={styles.listItem}>
        <Switch label="Комплекс" value={values.complex} onChange={() => setFieldValue('complex', !values.complex)} />
      </View>

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

export default BathroomServiceScreen;

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray.primary,
    paddingVertical: 15,
  },
});
