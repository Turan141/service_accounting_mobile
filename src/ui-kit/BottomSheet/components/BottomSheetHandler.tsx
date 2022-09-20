import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../../theme';

const BottomSheetHandler = () => {
  return <View style={styles.container} />;
};

export default BottomSheetHandler;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 4,
    backgroundColor: colors.gray.secondary,
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: 10,
  },
});
