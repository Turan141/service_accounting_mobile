import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../../theme';

import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface IconLabelProps {
  icon: string;
  textStyle?: StyleProp<TextStyle>;
}

const IconLabel: FC<IconLabelProps> = ({ children, icon, textStyle }) => {
  return (
    <View style={layout.rowAlignItemsCenter}>
      <MaterialDesignIcon name={icon} size={12} color={colors.gray.primary} />
      <Text style={[styles.text, textStyle]}>{children}</Text>
    </View>
  );
};

export default IconLabel;

const styles = StyleSheet.create({
  text: {
    ...fonts.extraSmallSemibold,
    color: colors.gray.primary,
    marginLeft: 5,
  },
});
