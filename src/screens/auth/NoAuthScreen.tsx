import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import colors from '../../theme/colors';
import logo from '../../assets/images/logo.png';
import fonts from '../../theme/fonts';
import { Button } from '../../ui-kit/Buttons';
import { useAppStore, useLoginStore } from '../../store/hooks';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../ui-kit/TextInput';
import _ from 'lodash';
import { BaseService } from '../../services';
import Config from 'react-native-config';
import { logToConsole } from '../../utils/formatting';
import { showMessage } from 'react-native-flash-message';
import healthService from '../../services/services/HealthService';
import * as qs from 'query-string';
import { observer } from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NoAuthScreen: React.FC = () => {
  const { initAuth, loading } = useLoginStore();
  const { setConfig, config, keycloak } = useAppStore();
  const [panel, setPanel] = useState<'login' | 'env'>('login');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('settings').then(async value => {
      if (value) {
        let settings = JSON.parse(value);
        setValue('api', settings.apiUrl);
        setValue('keycloak', settings.keycloak);
        await setConfig({
          apiUrl: settings.apiUrl,
          keycloak: {
            redirectUrl: Config.KEYCLOAK_REDIRECT_URL,
            clientId: Config.KEYCLOAK_CLIENT_ID,
            realm: Config.KEYCLOAK_REALM,
            url: settings.keycloak,
          },
        });
      }
    });
  }, []);

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      username: '',
      password: '',
      keycloak: config.keycloak.url,
      api: config.apiUrl,
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });
  const errorHandlers = BaseService.commonErrorHandlers;

  const login = async values => {
    try {
      await initAuth(values.username, values.password);
    } catch (error) {
      // errorHandlers.forEach(handler => handler(error.message, error.status, error.type));
      setMessage(error);
    }
  };

  // const checkHealth = async () => {
  //   // const response = await healthService.checkHealthSSO({
  //   //   url: config.keycloak.url + '/realms/utg-group/protocol/openid-connect/token',
  //   //   realm: qs.stringify({
  //   //     grant_type: 'password',
  //   //     username,
  //   //     password,
  //   //     client_id: encodeURIComponent(config.keycloak.clientId),
  //   //     scope: ['openid profile email'],
  //   //   }),
  //   // });
  //   const response = await healthService.checkHealth();
  //   setMessage(response);
  // };

  const saveConfig = async values => {
    logToConsole({
      apiUrl: values.api,
      keycloak: {
        redirectUrl: Config.KEYCLOAK_REDIRECT_URL,
        clientId: Config.KEYCLOAK_CLIENT_ID,
        realm: Config.KEYCLOAK_REALM,
        url: values.keycloak,
      },
    });
    await setConfig({
      apiUrl: values.api,
      keycloak: {
        redirectUrl: Config.KEYCLOAK_REDIRECT_URL,
        clientId: Config.KEYCLOAK_CLIENT_ID,
        realm: Config.KEYCLOAK_REALM,
        url: values.keycloak,
      },
    });
    await AsyncStorage.setItem('settings', JSON.stringify({ apiUrl: values.api, keycloak: values.keycloak }));
    showMessage({
      type: 'success',
      icon: 'auto',
      message: 'Настройки окружения сохранены',
      autoHide: true,
    });
  };

  const toggle = () => {
    if (panel === 'env') {
      setPanel('login');
    } else {
      setPanel('env');
    }
  };

  return (
    <View style={styles.container}>
      {message ? <Text>{JSON.stringify(message)}</Text> : <Image style={styles.logo} source={logo} />}
      <Text style={[fonts.titleBold, styles.headerText]}>uSmart</Text>
      <Text style={[fonts.paragraphRegular, styles.text]}>
        Для продолжения пользования системой, пожалуйста, авторизуйтесь.
      </Text>

      <View style={{ marginTop: 24, width: '100%', height: 200 }}>
        {panel === 'login' && (
          <>
            <Controller
              control={control}
              rules={{
                required: 'Заполните поля.',
              }}
              name="username"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  label={'Логин'}
                  value={value}
                  onChangeText={onChange}
                  status={errors.username ? 'error' : 'default'}
                />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: 'Заполните поля.',
              }}
              name="password"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={{ width: 70 }}
                  label={'Пароль'}
                  textContentType={'password'}
                  password={true}
                  value={value}
                  onChangeText={onChange}
                  status={errors.password ? 'error' : 'default'}
                />
              )}
            />

            <View style={styles.button}>
              <Button loading={loading} variant="primary" onPress={handleSubmit(login)}>
                Войти
              </Button>
              {/*<Button loading={loading} variant="success" onPress={checkHealth}>*/}
              {/*  Здоровье*/}
              {/*</Button>*/}
            </View>
          </>
        )}

        {panel === 'env' && (
          <>
            <Controller
              control={control}
              rules={{
                required: false,
              }}
              name="keycloak"
              render={({ field: { onChange, value } }) => (
                <TextInput label={'Keycloak URL'} value={value} onChangeText={onChange} />
              )}
            />

            <Controller
              control={control}
              rules={{
                required: false,
              }}
              name="api"
              render={({ field: { onChange, value } }) => (
                <TextInput style={{ width: 70 }} label={'API URL'} value={value} onChangeText={onChange} />
              )}
            />

            <View style={styles.button}>
              <Button loading={loading} variant="primary" onPress={handleSubmit(saveConfig)}>
                Сохранить конфиг
              </Button>
            </View>
          </>
        )}
      </View>

      <Text style={[fonts.smallSemibold, styles.bottomLogo]}>UTG GROUP</Text>
      <TouchableOpacity onPress={toggle}>
        <Text style={[fonts.paragraphMedium, styles.bottomLogo]}>
          {panel === 'login' && 'Настройки окружения'}
          {panel === 'env' && 'Логин'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 120,
    height: 120,
  },
  errorMessage: { position: 'absolute', top: 24, width: '100%', zIndex: 2 },
  headerText: {
    marginTop: 40,
  },
  text: {
    marginTop: 20,
    textAlign: 'center',
  },
  button: {
    marginTop: 24,
    marginHorizontal: '20%',
  },
  bottomLogo: {
    marginTop: 48,
    height: 20,
  },
});

export default observer(NoAuthScreen);
