import React, { FC } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { colors, fonts } from '../../../theme';

export interface BigCheckboxProps {
  value: string;
  label: string;
  checked: boolean;
  onChange: (value: string) => void;
}

const BigCheckbox: FC<BigCheckboxProps> = ({ value, label, checked, onChange }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onChange(value)}>
      <View
        style={{
          ...styles.container,
          elevation: checked ? 2 : 0,
        }}
      >
        <View />
        <View style={styles.checkboxContainer}>
          <Checkbox.Android
            uncheckedColor={colors.gray.secondary}
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => onChange(value)}
            color={colors.green.primary}
          />
        </View>

        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BigCheckbox;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderWidth: 1,
    borderColor: colors.gray.secondary,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: colors.white,
    height: 130,
    justifyContent: 'space-between',
  },
  label: {
    ...fonts.paragraphSemibold,
  },
  checkboxContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
});
