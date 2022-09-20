import { colors } from '../../../theme';
import { NotificationAlertProps } from '../../../ui-kit/Alerts/NotificationAlert';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';
export const DefaultNotificationAlertProps: NotificationAlertProps = {
  visible: false,
  type: 'success',
  message: null,
  loading: false,
};

export const getAlertColorsByType = (type: AlertType) => {
  const map: { [T in AlertType] } = {
    success: colors.green.light,
    info: colors.blue.light,
    warning: colors.orange.light,
    danger: colors.red.light,
  };

  return map[type] ?? colors.black;
};

export const getAlertIconOptionsByType = (type: AlertType) => {
  const iconOptions: { [T in AlertType] } = {
    success: {
      name: 'checkbox-marked-circle-outline',
      color: colors.green.primary,
    },
    danger: {
      name: 'alert-circle',
      color: colors.red.primary,
    },
    info: {
      name: 'information-outline',
      color: colors.blue.primary,
    },
    warning: {
      name: 'alert',
      color: colors.orange.primary,
    },
  };

  return iconOptions[type];
};
