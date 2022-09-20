import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import { Button } from '../../ui-kit/Buttons';
import { FormGroup } from '../../ui-kit/Forms';
import Icon from '../../ui-kit/Icon';
import PinCodeInput from '../../ui-kit/PinCodeInput';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { observer } from 'mobx-react';
import { PinCodeScreenProps } from '../../navigation/props';

interface PinCodeFormValues {
  pinCode: string;
}

const PinCodeFormValidationSchema: Yup.SchemaOf<PinCodeFormValues> = Yup.object().shape({
  pinCode: Yup.string().required(),
});

const PinCodeScreen: FC<PinCodeScreenProps> = ({ route, navigation }) => {
  const { navigateTo } = route.params;
  const [timer, setTimer] = useState(30);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current);
    }
  }, [timer]);

  useEffect(() => {
    startTimer();

    return () => clearInterval(intervalRef.current);
  }, []);

  const startTimer = useCallback(() => {
    setTimer(30);

    intervalRef.current = setInterval(() => setTimer(prevTimer => prevTimer - 1), 1000);
  }, [timer, intervalRef]);

  const { values, errors, handleSubmit, handleChange } = useFormik<PinCodeFormValues>({
    initialValues: {
      pinCode: '',
    },
    validationSchema: PinCodeFormValidationSchema,
    onSubmit: values => {
      if (navigateTo) navigation.navigate(navigateTo as any);
    },
  });

  return (
    <View style={styles.container}>
      <View>
        <View style={layout.alignCenter}>
          <Icon name="logo" color="#343D4F" width={300} height={66} />
        </View>

        <View style={styles.formContainer}>
          <FormGroup style={styles.confirmTextContainer}>
            <Text style={fonts.paragraphRegular}>Ввод кода</Text>
          </FormGroup>

          <FormGroup style={{ marginBottom: 30 }}>
            <PinCodeInput
              error={!!errors.pinCode}
              value={values.pinCode}
              onChange={handleChange('pinCode')}
              onFinish={(code: string) => handleSubmit()}
            />
          </FormGroup>

          {timer > 0 ? (
            <FormGroup>
              <Text style={{ ...fonts.extraSmallRegular, color: colors.gray.primary, textAlign: 'center' }}>
                Повторная попытка доступна через 0:{timer}
              </Text>
            </FormGroup>
          ) : null}
        </View>
      </View>

      <View>
        <Button onPress={startTimer} disabled={timer > 0}>
          Получить код повторно
        </Button>
      </View>
    </View>
  );
};

export default observer(PinCodeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 50,
    paddingTop: 108,
    paddingBottom: 200,
  },
  confirmTextContainer: {
    ...layout.alignCenter,
    marginTop: 5,
    marginBottom: 30,
  },
  formContainer: {
    marginBottom: 60,
  },
});
