import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { fonts, layout } from '../../theme';

import { Button } from '../../ui-kit/Buttons';
import { FormGroup } from '../../ui-kit/Forms';
import Icon from '../../ui-kit/Icon';
import TextInput from '../../ui-kit/TextInput';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { NewPasswordScreenProps } from '../../navigation/props';
import { APP_STACK } from '../../navigation/stacks';

interface NewPasswordFormValues {
  newPassword: string;
  newPasswordConfirm: string;
}

const NewPasswordFormValidationSchema: Yup.SchemaOf<NewPasswordFormValues> = Yup.object().shape({
  newPassword: Yup.string().required(),
  newPasswordConfirm: Yup.string().required(),
});

const NewPasswordScreen: FC<NewPasswordScreenProps> = ({ navigation }) => {
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<NewPasswordFormValues>({
    initialValues: {
      newPassword: 'admin',
      newPasswordConfirm: 'admin',
    },
    validationSchema: NewPasswordFormValidationSchema,
    onSubmit: () => navigation.navigate(APP_STACK as any),
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={layout.alignCenter}>
          <Icon name="logo" color="#343D4F" width={300} height={66} />
        </View>

        <View style={styles.formContainer}>
          <FormGroup style={styles.confirmTextContainer}>
            <Text style={fonts.paragraphRegular}>Назначение нового пароля</Text>
          </FormGroup>

          <FormGroup>
            <TextInput
              label="Введите новый пароль"
              value={values.newPassword}
              onChangeText={handleChange('newPassword')}
              status={errors.newPassword && touched.newPassword ? 'error' : 'default'}
              password
              leftIcon={<Icon name="lock" />}
            />
          </FormGroup>

          <FormGroup>
            <TextInput
              label="Повторите новый пароль"
              value={values.newPasswordConfirm}
              onChangeText={handleChange('newPasswordConfirm')}
              status={errors.newPasswordConfirm && touched.newPasswordConfirm ? 'error' : 'default'}
              password
              leftIcon={<Icon name="lock" />}
            />
          </FormGroup>
        </View>

        <View>
          <Button onPress={handleSubmit}>Войти</Button>
        </View>
      </View>
    </View>
  );
};

export default observer(NewPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 108,
    paddingBottom: 200,
  },
  formContainer: {
    marginBottom: 60,
  },
  confirmTextContainer: {
    ...layout.alignCenter,
    marginTop: 5,
    marginBottom: 30,
  },
});
