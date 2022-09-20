import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, fonts, layout } from '../../../theme';

export interface TimeLabelProps {
  time: string;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const TimeLabel: FC<TimeLabelProps> = ({ time, containerStyle, labelStyle }) => {
  return (
    <View style={[layout.rowAlignItemsCenter, containerStyle]}>
      <MaterialIcon name="clock-time-five" color={colors.gray.primary} size={12} />
      <Text style={[styles.time, labelStyle]}>{time}</Text>
    </View>
  );
};

export default TimeLabel;

const styles = StyleSheet.create({
  time: {
    ...fonts.extraSmallMedium,
    color: colors.gray.primary,
    marginLeft: 5,
  },
});
