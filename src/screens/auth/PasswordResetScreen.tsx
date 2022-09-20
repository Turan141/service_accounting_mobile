import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { Button } from '../../ui-kit/Buttons';
import { FormGroup } from '../../ui-kit/Forms';
import Icon from '../../ui-kit/Icon';
import TextInput from '../../ui-kit/TextInput';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { TextLink } from '../../ui-kit/Links';
import { PasswordResetScreenProps } from '../../navigation/props';
import { AuthStackScreens } from '../../navigation/enums';

interface PasswordResetFormValues {
  login: string;
  phone: string;
}

const PasswordResetFormValidationSchema: Yup.SchemaOf<PasswordResetFormValues> = Yup.object().shape({
  login: Yup.string().required(),
  phone: Yup.string().required(),
});

const PasswordResetScreen: FC<PasswordResetScreenProps> = ({ navigation }) => {
  const { values, errors, touched, handleSubmit, handleChange } = useFormik<PasswordResetFormValues>({
    initialValues: {
      login: '',
      phone: '',
    },
    validationSchema: PasswordResetFormValidationSchema,
    onSubmit: () =>
      navigation.navigate(AuthStackScreens.PinCode, {
        navigateTo: AuthStackScreens.NewPassword,
      }),
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={layout.alignCenter}>
          <Icon name="logo" color="#343D4F" width={300} height={66} />
        </View>

        <View style={styles.formContainer}>
          <FormGroup style={styles.confirmTextContainer}>
            <Text style={fonts.paragraphRegular}>Сброс пароля учетной записи</Text>
          </FormGroup>

          <FormGroup>
            <TextInput
              label="Логин"
              value={values.login}
              onChangeText={handleChange('login')}
              status={errors.login && touched.login ? 'error' : 'default'}
              leftIcon={<Icon name="user" />}
            />
          </FormGroup>

          <FormGroup>
            <TextInput
              label="Номер телефона"
              value={values.phone}
              onChangeText={handleChange('phone')}
              status={errors.phone && touched.phone ? 'error' : 'default'}
              leftIcon={<Icon name="phone" />}
              keyboardType="numeric"
              mask={'+7 ([000]) [000] - [00] - [00]'}
            />
          </FormGroup>

          <FormGroup>
            <Text style={{ ...fonts.extraSmallRegular, color: colors.gray.primary }}>
              Введите номер мобильного телефона для получения SMS-кода
            </Text>
          </FormGroup>
        </View>

        <View>
          <Button onPress={handleSubmit} style={{ marginBottom: 20 }}>
            Получить код
          </Button>
          <Button onPress={navigation.goBack} variant="link">
            Вернуться
          </Button>
        </View>
      </View>
    </View>
  );
};

export default observer(PasswordResetScreen);

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
