import React, { FC, ReactElement } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../../../../theme';

export interface SimpleListItemProps {
  title: string;
  value?: string | ReactElement;
  titleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  hideBorder?: boolean;
}

const SimpleListItem: FC<SimpleListItemProps> = ({
  title,
  value,
  titleStyle,
  valueStyle,
  containerStyle,
  hideBorder,
}) => {
  const renderValue = () => {
    if (!value) {
      return null;
    }

    if (typeof value === 'string') {
      return <Text style={[styles.value, valueStyle]}>{value}</Text>;
    } else {
      return value;
    }
  };

  return (
    <View
      style={{
        ...styles.container,
        borderBottomWidth: !hideBorder ? 1 : 0,
        ...(containerStyle as object),
      }}
    >
      <Text style={[fonts.paragraphRegular, titleStyle, { flexShrink: 1, flex: 1 }]}>{title}</Text>

      {renderValue()}
    </View>
  );
};

export default SimpleListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomColor: colors.gray.secondary,
    borderBottomWidth: 1,
  },
  value: {
    ...fonts.paragraphSemibold,
    flexShrink: 1,
    width: '60%',
    textAlign: 'right',
  },
});
