import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { colors, fonts } from '../../../../theme';

export interface CounterProps {
  count: number;
  limit: number;
  baseColor?: string;
  errorColor?: string;
  style?: StyleProp<TextStyle>;
}

const Counter: FC<CounterProps> = ({
  count,
  limit,
  baseColor = colors.gray.primary,
  errorColor = colors.red.primary,
  style,
}) => {
  if (!limit) return null;

  let textStyle = {
    color: count > limit ? errorColor : baseColor,
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.text, style, textStyle]}>
        {count} / {limit}
      </Text>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexBasis: 2,
    flexGrow: 2,
  },
  text: {
    ...fonts.extraSmallMedium,
    lineHeight: 12,
    textAlign: 'right',
  },
});
