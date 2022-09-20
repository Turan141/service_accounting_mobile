import React, { FC } from 'react';
import { StyleSheet, View, Text, StyleProp, ViewStyle } from 'react-native';

import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { colors, fonts } from '../../theme';

const SIZE = 16;

export interface PinCodeInputProps {
  value: string;
  onChange: (code: string) => void;
  onFinish: (code: string) => void;
  error?: boolean;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  readonly?: boolean;
}

const PinCodeInput: FC<PinCodeInputProps> = ({
  value,
  error,
  label,
  containerStyle,
  readonly = false,
  onChange,
  onFinish,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <SmoothPinCodeInput
        {...rest}
        password
        value={value}
        onTextChange={(code: string) => onChange(code)}
        onFulfill={(code: string) => onFinish(code)}
        cellStyle={{
          borderWidth: 1,
          borderRadius: 5,
          borderColor: error ? colors.red.primary : colors.gray.secondary,
          height: 55,
          width: 55,
          backgroundColor: colors.white,
        }}
        textStyle={{ ...fonts.paragraphSemibold, color: colors.black }}
        cellSpacing={20}
        keyboardType="numeric"
        mask={
          <View>
            <Text style={{ ...fonts.paragraphSemibold, color: colors.gray.primary }}>0</Text>
          </View>
        }
      />
    </View>
  );
};

export default PinCodeInput;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    ...fonts.paragraphRegular,
    color: colors.white,
    marginBottom: 16,
    textAlign: 'center',
  },
});
