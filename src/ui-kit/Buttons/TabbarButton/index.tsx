import React, { FC } from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { colors, fontFamilyMedium, fonts } from '../../../theme';

import { TouchableRipple } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface TabbarButtonProps extends ViewProps {
  isFocused: boolean;
  label: string;
  icon: string;
  onPress: () => void;
  onLongPress: () => void;
}

const TabbarButton: FC<TabbarButtonProps> = ({ isFocused, label, icon, onPress, onLongPress, ...otherProps }) => (
  <TouchableRipple
    accessibilityRole="button"
    accessibilityState={{ selected: isFocused }}
    onPress={onPress}
    onLongPress={onLongPress}
    style={{
      flex: 1,
      flexShrink: 1,
    }}
    rippleColor={colors.blue.light}
  >
    <View style={styles.container} {...otherProps}>
      <MaterialIcon name={icon} size={20} color={isFocused ? colors.blue.primary : colors.gray.primary} />

      <Text
        style={{
          ...styles.label,
          color: isFocused ? colors.blue.primary : colors.gray.primary,
        }}
        ellipsizeMode="tail"
        numberOfLines={1}
      >
        {label}
      </Text>
    </View>
  </TouchableRipple>
);

export default TabbarButton;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  label: {
    fontSize: 10,
    fontFamily: fontFamilyMedium,
    textAlign: 'center',
    marginTop: 5,
  },
});
