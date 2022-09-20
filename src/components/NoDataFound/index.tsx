import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export interface NoDataFoundProps {
  text?: string;
}

const NoDataFound: FC<NoDataFoundProps> = ({ text = 'Ничего не найдено' }) => {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <MaterialDesignIcon name="folder-information-outline" size={30} color={colors.black} />
      </View>

      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

export default NoDataFound;

const styles = StyleSheet.create({
  container: {
    ...layout.alignCenter,
    flex: 1,
    backgroundColor: colors.white,
  },
  text: {
    ...fonts.bodyMedium,
    textAlign: 'center',
  },
});
