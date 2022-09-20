import React, { FC, useCallback } from 'react';
import { StyleSheet, Text, View, ViewProps, ViewStyle } from 'react-native';
import { colors, fonts, layout } from '../../../theme';

import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { getAlertColorsByType, getAlertIconOptionsByType } from '../../../utils';

export interface InlineAlertProps extends ViewProps {
  children: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

const InlineAlert: FC<InlineAlertProps> = ({ children, type, style, ...otherProps }) => {
  const iconOptions = getAlertIconOptionsByType(type);
  const bgColors = getAlertColorsByType(type);
  const containerStyle: ViewStyle = {
    backgroundColor: bgColors,
    ...styles.container,
    ...(style as object),
  };

  return (
    <View style={containerStyle} {...otherProps}>
      <MaterialDesignIcon {...iconOptions} size={24} />

      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

export default InlineAlert;

const styles = StyleSheet.create({
  container: {
    ...layout.rowAlignItemsCenter,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  text: {
    ...fonts.extraSmallMedium,
    marginLeft: 14,
    flexShrink: 1,
  },
});
