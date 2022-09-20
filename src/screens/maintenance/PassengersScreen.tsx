import React, { FC } from 'react';
import { StyleSheet, Text } from 'react-native';
import { fonts } from '../../theme';

import { ContainerWithButton } from '../../ui-kit/Containers';
import { FormGroup } from '../../ui-kit/Forms';

import { useFormik } from 'formik';
import TextInput from '../../ui-kit/TextInput';
import { SimpleList } from '../../ui-kit/Lists';

interface PassengersFormValues {
  econom: number;
  business: number;
  additionalInfo: string;
}

const PassengersScreen: FC = () => {
  const { values, handleChange } = useFormik<PassengersFormValues>({
    initialValues: {
      econom: null,
      business: null,
      additionalInfo: '',
    },
    onSubmit: () => {},
  });

  return (
    <ContainerWithButton label="Прилет">
      <SimpleList>
        <SimpleList.Item title="Пассажиры (количество)" value="113/13/2" />
      </SimpleList>

      <Text style={styles.subtitle}>Автобусы</Text>
      <FormGroup>
        <TextInput
          label="Эконом"
          value={values.econom?.toString()}
          onChangeText={handleChange('econom')}
          keyboardType="numeric"
        />
      </FormGroup>

      <FormGroup>
        <TextInput label="Бизнес" value={values.business?.toString()} onChangeText={handleChange('business')} />
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

export default PassengersScreen;

const styles = StyleSheet.create({
  subtitle: {
    ...fonts.paragraphSemibold,
    marginVertical: 20,
  },
});
