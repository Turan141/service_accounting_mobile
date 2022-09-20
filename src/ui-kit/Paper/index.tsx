import React, { FC } from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import { colors, fonts } from '../../theme';

export interface PaperProps extends ViewProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

const Paper: FC<PaperProps> = ({ title, titleStyle, children, style, ...otherProps }) => {
  return (
    <View style={[styles.container, style]} {...otherProps}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
      {children}
    </View>
  );
};

export default Paper;

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    backgroundColor: colors.white,
    padding: 20,
  },
  title: {
    ...fonts.subtitleSemibold,
    marginBottom: 25,
  },
});
