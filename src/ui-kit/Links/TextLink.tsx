import React, { FC } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fonts } from '../../theme';

export interface TextLinkProps extends TextProps {
  children: string;
  onPress: () => void;
}

const TextLink: FC<TextLinkProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[fonts.paragraphRegular, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

export default TextLink;

const styles = StyleSheet.create({});
