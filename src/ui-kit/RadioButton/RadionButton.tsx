import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { RadioButton as RNPRadioButton } from 'react-native-paper';
import { colors, fonts, layout } from '../../theme';

import RadioButtonGroup from './components/RadioButtonGroup';

export interface RadioButtonProps {
  value: string;
  label: string;
  color?: string;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const RadionButton: FC<RadioButtonProps> & {
  Group: typeof RadioButtonGroup;
} = ({ value, label, color = colors.blue.primary, labelStyle, onPress }) => {
  return (
    <View style={layout.rowAlignItemsCenter}>
      <RNPRadioButton
        value={value}
        status={'unchecked'}
        uncheckedColor={colors.gray.secondary}
        onPress={onPress}
        color={color}
      />

      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </View>
  );
};

RadionButton.Group = RadioButtonGroup;

export default RadionButton;

const styles = StyleSheet.create({
  label: {
    ...fonts.paragraphRegular,
    marginLeft: 10,
    marginRight: 20,
  },
});
