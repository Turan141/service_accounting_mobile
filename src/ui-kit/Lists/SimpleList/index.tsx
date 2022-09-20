import React, { FC } from 'react';
import { StyleSheet, View, ViewProps, Text, StyleProp, TextStyle } from 'react-native';
import { fonts } from '../../../theme';

import SimpleListItem from './components/SimpleListItem';

export interface SimpleListProps extends ViewProps {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
}

const SimpleList: FC<SimpleListProps> & {
  Item: typeof SimpleListItem;
} = ({ title, children, style, titleStyle, ...otherProps }) => {
  return (
    <View style={style} {...otherProps}>
      {title && <Text style={[styles.title, titleStyle]}>{title}</Text>}

      {children}
    </View>
  );
};

SimpleList.Item = SimpleListItem;

export default SimpleList;

const styles = StyleSheet.create({
  title: {
    ...fonts.subtitleBold,
    marginBottom: 15,
  },
});
