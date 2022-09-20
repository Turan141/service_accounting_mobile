import React, { FC } from 'react';
import { StyleSheet, View, ViewProps, ActivityIndicator } from 'react-native';
import { colors } from '../../theme';

const SpinnerLoading: FC<ViewProps> = ({ style, ...otherProps }) => {
  return (
    <View style={[styles.container, style]} {...otherProps}>
      <ActivityIndicator color={colors.background} size="large" />
    </View>
  );
};

export default SpinnerLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
});
