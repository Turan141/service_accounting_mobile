import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../theme';

import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from '../../ui-kit/Buttons';
import { useAppStore, useLoginStore } from '../../store/hooks';

export interface NoRightsAlertProps {
  text?: string;
}

const NoRightsAlert: FC<NoRightsAlertProps> = ({
  text = 'К сожалению, пока у вас нет прав доступа. Обратитесь к администратору.',
}) => {
  const { logout } = useLoginStore();
  const { setShowNoRightsScreen } = useAppStore();

  const handleLogout = async () => {
    await logout();
    setShowNoRightsScreen(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <MaterialDesignIcon name="folder-information-outline" size={30} color={colors.black} />
      </View>

      <Text style={styles.text}>{text}</Text>

      <View style={{ marginTop: 40 }}>
        <Button compact variant="secondary" onPress={handleLogout}>
          Выйти
        </Button>
      </View>
    </View>
  );
};

export default NoRightsAlert;

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
