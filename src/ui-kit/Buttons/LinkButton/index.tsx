import React, { FC } from 'react';
import { TouchableWithoutFeedbackProps, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { colors, fonts, layout } from '../../../theme';

import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StyleProp } from 'react-native';
import { useCallback } from 'react';

export interface LinkButtonProps extends TouchableWithoutFeedbackProps {
  title?: string;
  subtitle: string;
  containerStyle?: StyleProp<ViewStyle>;
  status?: 'error' | 'success' | 'default';
  onPress: () => void;
}

const LinkButton: FC<LinkButtonProps> = ({
  title,
  subtitle,
  disabled = false,
  style,
  containerStyle,
  status = 'default',
  onPress = () => {},
}) => {
  const getStatusColor = useCallback(() => {
    const colorsMap = {
      error: colors.red.primary,
      success: colors.green.primary,
      default: colors.gray.primary,
    };

    return colorsMap[status] ?? colors.gray.primary;
  }, [status]);

  return (
    <TouchableRipple
      borderless
      style={{
        ...(style as object),
        borderRadius: 5,
      }}
      disabled={disabled}
      onPress={onPress}
    >
      <View
        style={{
          ...styles.container,
          ...(containerStyle as object),
          borderColor: getStatusColor(),
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <Text
            style={{
              ...styles.subtitle,
              color: getStatusColor(),
            }}
          >
            {subtitle}
          </Text>
          <Text style={styles.title}>{title}</Text>
        </View>

        {!disabled && (
          <View>
            <MaterialDesignIcon name="chevron-right" size={24} color={colors.gray.primary} />
          </View>
        )}
      </View>
    </TouchableRipple>
  );
};

export default LinkButton;

const styles = StyleSheet.create({
  container: {
    ...layout.rowSpaceBetween,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 22,
  },
  subtitle: {
    ...fonts.smallSemibold,
    color: colors.gray.primary,
  },
  title: {
    ...fonts.paragraphSemibold,
    marginTop: 2,
  },
});
