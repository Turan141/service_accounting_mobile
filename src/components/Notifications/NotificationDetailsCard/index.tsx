import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, layout } from '../../../theme';

import Icon from '../../../ui-kit/Icon';
import { Button } from '../../../ui-kit/Buttons';

export interface NotificationDetailsCardProps {
  text: string;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  cancelButtonText?: string;
  confirmButtonText?: string;
  onCancelButtonPress?: () => void;
  onConfirmButtonPress?: () => void;
}

const NotificationDetailsCard: FC<NotificationDetailsCardProps> = ({
  text,
  hideCancelButton = false,
  hideConfirmButton = false,
  cancelButtonText = 'Позже',
  confirmButtonText = 'Ознакомился',
  onCancelButtonPress = () => {},
  onConfirmButtonPress = () => {},
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        <Icon name="notificationWarning" />

        <Text style={fonts.titleSemibold}>{text}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {!hideCancelButton && (
          <Button style={{ width: 150 }} variant="secondary" onPress={onCancelButtonPress}>
            {cancelButtonText}
          </Button>
        )}

        {!hideConfirmButton && (
          <Button style={{ width: 150 }} onPress={onConfirmButtonPress}>
            {confirmButtonText}
          </Button>
        )}
      </View>
    </View>
  );
};

export default NotificationDetailsCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    borderRadius: 18,
    backgroundColor: colors.white,
    flex: 1,
    elevation: 3,
  },
  bodyContainer: {
    ...layout.alignCenter,
    flex: 1,
  },
  buttonsContainer: {
    ...layout.rowSpaceBetween,
    borderTopColor: colors.gray.primary,
    borderTopWidth: 0.5,
    padding: 15,
  },
});
