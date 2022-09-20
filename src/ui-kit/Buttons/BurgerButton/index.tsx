import React, { FC } from 'react';
import { View, ViewProps } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors } from '../../../theme';
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/native';

export interface BackButtonProps extends ViewProps {
  onPress?: () => void;
}

const BurgerButton: FC<BackButtonProps> = ({ style, ...otherProps }) => {
  const navigation = useNavigation();
  return (
    <View style={style} {...otherProps}>
      <IconButton
        icon="menu"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
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

export default BurgerButton;
