import React, { FC, ReactElement } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, layout } from '../../../theme';

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface TouchableLabelProps {
  children: JSX.Element | string;
  style?: ViewStyle;
}

const TouchableLabel: FC<TouchableLabelProps> = ({ children, style = {} }) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.innerContainer}>
        {typeof children === 'string' ? (
          <Text numberOfLines={1} ellipsizeMode="tail" style={fonts.paragraphSemibold}>
            {children}
          </Text>
        ) : (
          children
        )}

        <MaterialIcon name="chevron-right" color={colors.gray.primary} size={24} />
      </View>
    </View>
  );
};

export default TouchableLabel;

const styles = StyleSheet.create({
  container: {
    ...layout.rowAlignCenter,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: colors.gray.primary,
    minWidth: 150,
  },
  innerContainer: {
    ...layout.rowSpaceBetween,
    paddingHorizontal: 15,
    flex: 1,
  },
});
