import React, { FC, ReactNode } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { colors, fonts, layout } from '../../theme';

import IconRadioButtonGroup from './components/IconRadioButtonGroup';

export interface IconRadioButtonProps {
  value: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
  labelStyle?: StyleProp<TextStyle>;
  onPress?: () => void;
}

const IconRadioButton: FC<IconRadioButtonProps> & {
  Group: typeof IconRadioButtonGroup;
} = ({ icon, label, labelStyle, active, onPress }) => {
  return (
    <TouchableRipple onPress={onPress} rippleColor={colors.blue.light}>
      <View
        style={{
          ...styles.container,
          backgroundColor: active ? colors.blue.primary : colors.white,
          paddingTop: icon ? 30 : 10,
          paddingBottom: icon ? 0 : 10,
        }}
      >
        {icon && <View style={styles.iconContainer}>{icon}</View>}

        <View
          style={{
            ...layout.rowAlignCenter,
            marginTop: icon ? 30 : 0,
            height: 40,
          }}
        >
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={{
              ...styles.label,
              ...(labelStyle as object),
              color: active ? colors.white : colors.black,
            }}
          >
            {label}
          </Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

IconRadioButton.Group = IconRadioButtonGroup;

export default IconRadioButton;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: colors.gray.primary,
  },
  iconContainer: {
    height: 50,
  },
  label: {
    ...fonts.smallRegular,
    flexShrink: 1,
  },
});
