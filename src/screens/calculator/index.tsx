// @ts-nocheck
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput as TI } from 'react-native';
import { RadioButton, TouchableRipple } from 'react-native-paper';
import { colors, fonts, layout } from '../../theme';
import { useForm, Controller } from 'react-hook-form';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { storageService } from '../../services';
import { Button } from '../../ui-kit/Buttons';
import { useIsFocused } from '@react-navigation/native';
import Modal from '../../ui-kit/Modal';

enum TankBalanceMeasurementEnum {
  kg = 'kg',
  lb = 'lb',
}

export const CALCULATOR_RESULTS_KEY = 'CALCULATOR_RESULTS_KEY';

const TextInput = props => (
  <TI placeholderTextColor={colors.black} placeholder={'0'} keyboardType={'numeric'} {...props} />
);

const Calculator: FC = ({ navigation }) => {
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    storageService.getItem(CALCULATOR_RESULTS_KEY).then(value => setResults(value || []));
  }, [isFocused]);

  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
    clearErrors,
    setValue,
    reset,
  } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      tankBalanceMeasure: TankBalanceMeasurementEnum.kg,
      tankLeft: null,
      tankCtrl: null,
      tankRight: null,
      totalFuel: null,
      density: null,
      result: null,
    },
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: false,
    shouldUnregister: false,
    shouldUseNativeValidation: false,
    delayError: undefined,
  });

  const calculate = values => {
    const { tankBalanceMeasure, tankLeft, tankCtrl, tankRight, totalFuel, density } = values;
    if (!density || !totalFuel) {
      setError('totalFuel', { message: 'Введите значения для плотности/общей заправки' });
      return;
    }
    if (totalFuel - tankLeft - tankRight - tankCtrl <= 0) {
      setError('totalFuel', { message: 'Остатки по бакам превышают полную заправку' });
      return;
    }

    let result;
    if (tankBalanceMeasure === TankBalanceMeasurementEnum.lb) {
      result = (totalFuel - tankLeft - tankRight - tankCtrl) / (2.204623 * density);
    } else {
      result = (totalFuel - tankLeft - tankRight - tankCtrl) / density;
    }
    result = Math.round(+result.toFixed(1)) + ' л';
    storageService.setItem(CALCULATOR_RESULTS_KEY, [
      { tankBalanceMeasure, tankLeft, tankCtrl, tankRight, totalFuel, density, result, date: Date.now() },
      ...results,
    ]);
    setValue('result', result);
    clearErrors();
  };

  const renderTips = () => {
    if (!watch('tankLeft')) {
      return 'Введите остаток в левом баке';
    }
    if (!watch('tankCtrl')) {
      return 'Введите остаток в центральном баке';
    }
    if (!watch('tankRight')) {
      return 'Введите остаток в правом баке';
    }
    if (!watch('totalFuel')) {
      return 'Введите общую заправку';
    }
    if (!watch('density')) {
      return 'Введите плотность';
    }
  };

  return (
    <View style={layout.screenContainer}>
      <View style={s.tanksContainer}>
        <View style={[s.tankContainer, { backgroundColor: colors.green.light }]}>
          <Controller
            control={control}
            name={'tankLeft'}
            render={({ field: { value, onChange } }) => (
              <TextInput
                autoFocus={true}
                returnKeyType={'next'}
                style={s.tankContainerInput}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Text style={fonts.extraSmallBold}>left</Text>
        </View>
        <View style={[s.tankContainer, { backgroundColor: colors.gray.light }]}>
          <Controller
            control={control}
            name={'tankCtrl'}
            render={({ field: { value, onChange } }) => (
              <TextInput returnKeyType={'next'} style={s.tankContainerInput} value={value} onChangeText={onChange} />
            )}
          />
          <Text style={fonts.extraSmallBold}>ctr</Text>
        </View>
        <View style={[s.tankContainer, { backgroundColor: colors.blue.light }]}>
          <Controller
            control={control}
            name={'tankRight'}
            render={({ field: { value, onChange } }) => (
              <TextInput returnKeyType={'next'} style={s.tankContainerInput} value={value} onChangeText={onChange} />
            )}
          />
          <Text style={fonts.extraSmallBold}>right</Text>
        </View>
      </View>

      <View style={layout.rowSpaceBetween}>
        <Text>Общая заправка</Text>
        <Controller
          control={control}
          name={'totalFuel'}
          render={({ field: { value, onChange } }) => (
            <TextInput style={s.rowInput} value={value} onChangeText={onChange} />
          )}
        />
      </View>
      <View style={layout.rowSpaceBetween}>
        <Text>Плотность</Text>
        <Controller
          control={control}
          name={'density'}
          render={({ field: { value, onChange } }) => (
            <TextInput
              style={s.rowInput}
              value={value}
              onChangeText={onChange}
              onSubmitEditing={handleSubmit(calculate)}
            />
          )}
        />
      </View>

      <View style={[layout.alignCenter, s.tipsView]}>
        <Text style={fonts.paragraphSemibold}>{renderTips()}</Text>
        <Text style={[fonts.paragraphBold, s.error]}>{errors.totalFuel?.message}</Text>
      </View>

      <View style={[layout.rowSpaceBetween, s.resultView]}>
        <Controller
          control={control}
          name={'result'}
          render={({ field: { value } }) => <Text style={fonts.titleSemibold}>{value}</Text>}
        />
        <TouchableRipple onPress={() => navigation.navigate('CalculatorHistory')}>
          <Icon name={'history'} style={{ fontSize: 36 }} />
        </TouchableRipple>
      </View>

      <View style={[layout.rowSpaceBetween, s.resultView]}>
        <View style={s.button}>
          <Button onPress={() => reset()}>Новый расчет</Button>
        </View>
        <View style={s.button}>
          <Button onPress={() => setOpen(true)}>Рассчитать</Button>
        </View>
      </View>

      <Modal showConfirm={false} onBackdropPress={() => setOpen(false)} transparent animationType="fade" visible={open}>
        <Controller
          control={control}
          name={'tankBalanceMeasure'}
          render={({ field: { value, onChange } }) => {
            return (
              <RadioButton.Group
                onValueChange={v => {
                  onChange(v);
                  setOpen(false);
                  handleSubmit(calculate)();
                }}
                value={value}
              >
                <View style={layout.rowSpaceAround}>
                  <Text style={fonts.bodyMedium}>Остаток по бакам</Text>
                  <View style={s.radioButton}>
                    <Text style={fonts.extraSmallBold}>{TankBalanceMeasurementEnum.kg}</Text>
                    <RadioButton color={colors.blue.primary} value={TankBalanceMeasurementEnum.kg} />
                  </View>
                  <View style={s.radioButton}>
                    <Text style={fonts.extraSmallBold}>{TankBalanceMeasurementEnum.lb}</Text>
                    <RadioButton color={colors.blue.primary} value={TankBalanceMeasurementEnum.lb} />
                  </View>
                </View>
              </RadioButton.Group>
            );
          }}
        />
      </Modal>
    </View>
  );
};

const s = StyleSheet.create({
  radioButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tanksContainer: {
    ...layout.rowSpaceAround,
    height: 69,
    marginHorizontal: -10,
    marginTop: 10,
  },
  tankContainer: {
    flex: 1,
    padding: 5,
  },
  tankContainerInput: {
    ...fonts.bodyBold,
    color: colors.black,
    flex: 1,
  },
  rowInput: {
    ...fonts.bodyBold,
    color: colors.black,
  },
  tipsView: {
    marginTop: 14,
  },
  resultView: {
    marginTop: 16,
    paddingHorizontal: 14,
  },
  error: {
    color: colors.red.primary,
  },
  button: {
    width: '40%',
  },
});

export default Calculator;
