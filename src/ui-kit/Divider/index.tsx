import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { colors } from '../../theme';

const Divider: FC<ViewProps> = ({ style, ...otherProps }) => {
  return <View style={[styles.divider, style]} {...otherProps} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    backgroundColor: colors.gray.secondary,
    height: 1,
    marginVertical: 20,
  },
});
