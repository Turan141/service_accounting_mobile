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

interface CoolingFormValues {
  stationary: boolean;
  mobile: boolean;
  number: number;
  additionalInfo: string;
}

const CoolingScreen: FC = () => {
  // TODO: Connect validation
  const { values, handleChange, handleSubmit, setFieldValue } = useFormik<CoolingFormValues>({
    initialValues: {
      stationary: false,
      mobile: false,
      number: null,
      additionalInfo: '',
    },
    onSubmit: (values: CoolingFormValues) => {
      console.log({
        values,
      });
    },
  });

  return (
    <ContainerWithButton onButtonPress={handleSubmit} label="Прилет">
      <View style={styles.listItem}>
        <Switch
          label="Стационарный"
          value={values.stationary}
          onChange={() => setFieldValue('stationary', !values.stationary)}
        />
      </View>

      <View style={styles.listItem}>
        <Switch label="Передвижной" value={values.mobile} onChange={() => setFieldValue('mobile', !values.mobile)} />
      </View>

      <FormGroup>
        <TextInput
          label="№"
          keyboardType="numeric"
          value={values.number?.toString()}
          onChangeText={handleChange('number')}
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

export default CoolingScreen;

const styles = StyleSheet.create({
  listItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.gray.primary,
    paddingVertical: 15,
  },
});
