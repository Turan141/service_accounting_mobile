import React, { FC } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { colors, fonts, layout } from '../../../theme';

export interface BottomSheetHeaderProps {
  title: string;
  style: StyleProp<ViewStyle>;
  onClosePress: () => void;
}

const BottomSheetHeader: FC<BottomSheetHeaderProps> = ({ title, onClosePress, style }) => {
  return (
    <View style={[styles.header, style]}>
      <Text style={fonts.titleRegular}>{title}</Text>

      <IconButton icon="close" color={colors.black} onPress={onClosePress} />
    </View>
  );
};

export default BottomSheetHeader;

const styles = StyleSheet.create({
  header: {
    ...layout.rowSpaceBetween,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray.secondary,
    paddingBottom: 10,
    paddingHorizontal: 25,
    backgroundColor: colors.white,
  },
});
