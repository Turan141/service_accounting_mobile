import React, { FC } from 'react';
import { StyleSheet, View, ViewProps, ScrollViewProps, Text, ViewStyle, StyleProp } from 'react-native';
import { colors, fonts } from '../../theme';

import { Button } from '../Buttons';
import { ButtonProps } from '../Buttons/Button';
import ScrollViewContainer from './ScrollViewContainer';

export interface ContainerWithButtonProps extends ViewProps {
  label?: string;
  scrollViewProps?: ScrollViewProps;
  buttonLabel?: string;
  buttonProps?: ButtonProps;
  buttonContainerStyle?: StyleProp<ViewStyle>;
  onButtonPress?: () => void;
}

const ContainerWithButton: FC<ContainerWithButtonProps> = ({
  label,
  children,
  style,
  scrollViewProps,
  buttonProps,
  buttonLabel = 'Сохранить',
  onButtonPress = () => {},
  ...otherProps
}) => {
  return (
    <View style={[styles.container, style]} {...otherProps}>
      <ScrollViewContainer {...scrollViewProps}>
        {label && <Text style={styles.title}>{label}</Text>}

        {children}
      </ScrollViewContainer>

      <View style={styles.buttonContainer}>
        <Button onPress={onButtonPress} {...buttonProps}>
          {buttonLabel}
        </Button>
      </View>
    </View>
  );
};

export default ContainerWithButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
  },
  title: {
    ...fonts.subtitleBold,
    marginBottom: 20,
  },
});
