import React, { FC } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { colors } from '../../theme';
import { useHideTabbar } from '../../hooks';

import NotificationDetailsCard from '../../components/Notifications/NotificationDetailsCard';

import { BaseScreenProps } from '../../navigation/props';

const NotificationDetailsScreen: FC<BaseScreenProps> = ({ navigation }) => {
  useHideTabbar(navigation);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={colors.red.primary} barStyle="light-content" />

      {/* Notification information */}
      <NotificationDetailsCard text="Начался ураган!" />
    </View>
  );
};

export default NotificationDetailsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.red.primary,
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
});
