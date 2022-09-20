import React, { FC, useCallback } from 'react';
import { ActivityIndicator, StyleProp, TextStyle, View, ViewStyle } from 'react-native';
import { StyleSheet, Text, TouchableWithoutFeedbackProps } from 'react-native';

import { TouchableRipple } from 'react-native-paper';
import { colors, fonts, layout } from '../../../theme';

export interface ButtonProps extends TouchableWithoutFeedbackProps {
  children?: string;
  variant?: 'primary' | 'success' | 'danger' | 'secondary' | 'link';
  compact?: boolean;
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  onPress,
  style,
  compact = false,
  loading = false,
  disabled = false,
  ...otherProps
}) => {
  const getButtonStyles = useCallback(() => {
    const bgColorsMap = {
      primary: colors.blue.primary,
      success: colors.green.primary,
      danger: colors.red.primary,
      secondary: colors.gray.light,
      link: colors.transparent,
    };
    const styleObject: StyleProp<ViewStyle> = {
      ...styles.button,
      backgroundColor: bgColorsMap[variant],
      height: compact ? 35 : 45,
      ...(style as object),
    };

    return styleObject;
  }, [variant, style]);

  const getButtonTextStyles = useCallback(() => {
    const textStyle: StyleProp<TextStyle> = {
      ...fonts.paragraphBold,
      color: variant === 'secondary' || variant === 'link' ? colors.black : colors.white,
    };

    return textStyle;
  }, [variant]);

  return (
    <View>
      <TouchableRipple
        borderless
        style={getButtonStyles()}
        onPress={onPress}
        disabled={disabled || loading}
        {...otherProps}
      >
        {!loading ? (
          <Text style={getButtonTextStyles()}>{children}</Text>
        ) : (
          <ActivityIndicator size="small" color={colors.white} />
        )}
      </TouchableRipple>

      {disabled && <View style={styles.disabledWrapper} />}
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    ...layout.rowAlignCenter,
    width: '100%',
    borderRadius: 50,
  },
  disabledWrapper: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.white,
    borderRadius: 50,
    zIndex: 99,
    opacity: 0.5,
  },
});
