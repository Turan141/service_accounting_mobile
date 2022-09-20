import React, { FC, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { colors, fonts, layout } from '../../../theme';
import Modal, { ModalProps } from '../../Modal';

import MaterialDesignIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from 'react-native-paper';
import { AlertType, getAlertColorsByType, getAlertIconOptionsByType } from '../../../utils';
import { useAppStore } from '../../../store/hooks';

export interface NotificationAlertProps extends ModalProps {
  loading?: boolean;
  type: AlertType;
  message: string;
  autoClose?: boolean;
  autoCloseTimer?: number;
  onHide?: () => void;
}

const NotificationAlert: FC<NotificationAlertProps> = ({
  visible,
  loading,
  type,
  message,
  autoClose = true,
  autoCloseTimer = 3000,
  onHide = () => {},
  ...otherProps
}) => {
  const { hideNotificationAlert } = useAppStore();
  const backgroundColor = getAlertColorsByType(type);
  const iconOptions = getAlertIconOptionsByType(type);
  const boxContainerStyle: ViewStyle = {
    backgroundColor,
    borderRadius: 5,
  };
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (visible && autoClose) {
      timeoutRef.current = setTimeout(() => {
        hideNotificationAlert();
        onHide();
      }, autoCloseTimer);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [visible]);

  return (
    <Modal
      visible={visible}
      showConfirm={false}
      bodyContainerStyle={{ paddingHorizontal: 20 }}
      boxContainerStyle={boxContainerStyle}
      {...otherProps}
    >
      <View style={layout.rowAlignItemsCenter}>
        <View style={{ marginRight: 14 }}>
          {loading ? (
            <ActivityIndicator color={colors.green.primary} size={24} />
          ) : (
            <MaterialDesignIcon {...iconOptions} size={24} />
          )}
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>
    </Modal>
  );
};

export default NotificationAlert;

const styles = StyleSheet.create({
  message: {
    ...fonts.smallMedium,
    flexShrink: 1,
  },
});
