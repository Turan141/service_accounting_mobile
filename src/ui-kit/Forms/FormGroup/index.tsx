import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const FormGroup: FC<ViewProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default FormGroup;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
});
