import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { NotificationItem } from '../../components/Notifications';
import { NotificationsStackScreens } from '../../navigation/enums';
import { NotificationsScreenProps } from '../../navigation/props';
import { colors, fonts } from '../../theme';
import { ScrollViewContainer } from '../../ui-kit/Containers';

const NotificationsScreen: FC<NotificationsScreenProps> = ({ navigation }) => {
  return (
    <ScrollViewContainer>
      {/* New notifications */}
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.titleText}>Новые</Text>
        <NotificationItem
          onPress={() => navigation.navigate(NotificationsStackScreens.NotificationDetails, { id: 123 })}
          title="Начался ураган!"
          date="2021-05-27T18:21:00"
        />
      </View>

      {/* Read notifications */}
      <View>
        <Text style={styles.titleText}>Просмотренные</Text>
        <NotificationItem read title="Начался ураган!" date="2021-05-27T18:21:00" />
        <NotificationItem read title="Начался ураган!" date="2021-05-27T18:21:00" />
      </View>
    </ScrollViewContainer>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  titleText: {
    ...fonts.smallSemibold,
    color: colors.gray.primary,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
});
