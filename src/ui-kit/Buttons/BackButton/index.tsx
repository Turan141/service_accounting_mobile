import React, { FC } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import { IconButton } from 'react-native-paper';
import { colors } from '../../../theme';

export interface BackButtonProps extends ViewProps {
  onPress: () => void;
}

const BackButton: FC<BackButtonProps> = ({ onPress, style, ...otherProps }) => {
  return (
    <View style={style} {...otherProps}>
      <IconButton
        icon="arrow-left"
        onPress={onPress}
        size={24}
        style={{
          borderRadius: 100,
          ...(style as object),
        }}
        color={colors.violet.primary}
      />
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({});
