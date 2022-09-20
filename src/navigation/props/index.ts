import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  AuthStackScreens,
  TenderStackScreens,
  NotificationsStackScreens,
  PooStackScreens,
  TasksStackScreens,
} from '../enums';
import {
  AuthStackParamList,
  TenderStackParamList,
  NotificationsStackParamList,
  PooStackParamList,
  TasksStackParamList,
} from '../params';

export type BaseRouteProp = RouteProp<{}, never>;
export type BaseNavigationProp = StackNavigationProp<{}, never>;
export type BaseScreenProps = {
  route: BaseRouteProp;
  navigation: BaseNavigationProp;
};

// Tenders
export type TenderScreenRouteProp = RouteProp<TenderStackParamList, TenderStackScreens>;
export type TenderScreenNavigationProp = StackNavigationProp<any, TenderStackScreens>;
export type TenderScreenProps = {
  route: TenderScreenRouteProp;
  navigation: TenderScreenNavigationProp;
};

// Tasks
export type TasksScreenRouteProp = RouteProp<TasksStackParamList, TasksStackScreens.Tasks>;
export type TasksScreenNavigationProp = StackNavigationProp<TasksStackParamList, TasksStackScreens.Tasks>;
export type TasksScreenProps = {
  route: TasksScreenRouteProp;
  navigation: TasksScreenNavigationProp;
};

export type TaskDetailsScreenRouteProp = RouteProp<TasksStackParamList, TasksStackScreens.TaskDetails>;
export type TaskDetailsScreenNavigationProp = StackNavigationProp<TasksStackParamList, TasksStackScreens.TaskDetails>;
export type TaskDetailsScreenProps = {
  route: TaskDetailsScreenRouteProp;
  navigation: TaskDetailsScreenNavigationProp;
};

export type TaskReportScreenRouteProp = RouteProp<TasksStackParamList, TasksStackScreens.TaskReport>;
export type TaskReportScreenNavigationProp = StackNavigationProp<TasksStackParamList, TasksStackScreens.TaskReport>;
export type TaskReportScreenProps = {
  route: TaskReportScreenRouteProp;
  navigation: TaskReportScreenNavigationProp;
};

export type MaintenanceScreenRouteProp = RouteProp<TasksStackParamList, TasksStackScreens.Maintenance>;
export type MaintenanceScreenNavigationProp = StackNavigationProp<TasksStackParamList, TasksStackScreens.Maintenance>;
export type MaintenanceScreenProps = {
  route: MaintenanceScreenRouteProp;
  navigation: MaintenanceScreenNavigationProp;
};

// Notifications
export type NotificationsScreenRouteProp = RouteProp<
  NotificationsStackParamList,
  NotificationsStackScreens.Notifications
>;
export type NotificationsScreenNavigationProp = StackNavigationProp<
  NotificationsStackParamList,
  NotificationsStackScreens.Notifications
>;
export type NotificationsScreenProps = {
  route: NotificationsScreenRouteProp;
  navigation: NotificationsScreenNavigationProp;
};

// POO
export type PooAgentScreenRouteProp = RouteProp<PooStackParamList, PooStackScreens.PooAgent>;
export type PooAgentScreenNavigationProp = StackNavigationProp<PooStackParamList, PooStackScreens.PooAgent>;
export type PooAgentScreenProps = {
  route: PooAgentScreenRouteProp;
  navigation: PooAgentScreenNavigationProp;
};

export type PooTransportEmployeeScreenRouteProp = RouteProp<PooStackParamList, PooStackScreens.PooTransportEmployee>;
export type PooTransportEmployeeScreenNavigationProp = StackNavigationProp<
  PooStackParamList,
  PooStackScreens.PooTransportEmployee
>;
export type PooTransportEmployeeScreenProps = {
  route: PooTransportEmployeeScreenRouteProp;
  navigation: PooTransportEmployeeScreenNavigationProp;
};

export type PooAgentResultsScreenRouteProp = RouteProp<PooStackParamList, PooStackScreens.PooAgentResults>;
export type PooAgentResultsScreenNavigationProp = StackNavigationProp<
  PooStackParamList,
  PooStackScreens.PooAgentResults
>;
export type PooAgentResultsScreenProps = {
  route: PooAgentResultsScreenRouteProp;
  navigation: PooAgentResultsScreenNavigationProp;
};

export type PooSignScreenRouteProp = RouteProp<PooStackParamList, PooStackScreens.PooSign>;
export type PooSignScreenNavigationProp = StackNavigationProp<PooStackParamList, PooStackScreens.PooSign>;
export type PooSignScreenProps = {
  route: PooSignScreenRouteProp;
  navigation: PooSignScreenNavigationProp;
};

export type PooEnterTransportNumberScreenRouteProp = RouteProp<
  TasksStackParamList,
  TasksStackScreens.PooEnterTransportNumber
>;
export type PooEnterTransportNumberScreenNavigationProp = StackNavigationProp<
  TasksStackParamList,
  TasksStackScreens.PooEnterTransportNumber
>;
export type PooEnterTransportNumberScreenProps = {
  route: PooEnterTransportNumberScreenRouteProp;
  navigation: PooEnterTransportNumberScreenNavigationProp;
};

export type PooUpdateReasonScreenRouteProp = RouteProp<PooStackParamList, PooStackScreens.PooUpdateReason>;
export type PooUpdateReasonScreenNavigationProp = StackNavigationProp<
  PooStackParamList,
  PooStackScreens.PooUpdateReason
>;
export type PooUpdateReasonScreenProps = {
  route: PooUpdateReasonScreenRouteProp;
  navigation: PooUpdateReasonScreenNavigationProp;
};

// Auth
export type LoginScreenRouteProp = RouteProp<AuthStackParamList, AuthStackScreens.Login>;
export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, AuthStackScreens.Login>;
export type LoginScreenProps = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

export type PhoneScreenRouteProp = RouteProp<AuthStackParamList, AuthStackScreens.Phone>;
export type PhoneScreenNavigationProp = StackNavigationProp<AuthStackParamList, AuthStackScreens.Phone>;
export type PhoneScreenProps = {
  route: PhoneScreenRouteProp;
  navigation: PhoneScreenNavigationProp;
};

export type PinCodeScreenRouteProp = RouteProp<AuthStackParamList, AuthStackScreens.PinCode>;
export type PinCodeScreenNavigationProp = StackNavigationProp<AuthStackParamList, AuthStackScreens.PinCode>;
export type PinCodeScreenProps = {
  route: PinCodeScreenRouteProp;
  navigation: PinCodeScreenNavigationProp;
};

export type PasswordResetScreenRouteProp = RouteProp<AuthStackParamList, AuthStackScreens.PasswordReset>;
export type PasswordResetScreenNavigationProp = StackNavigationProp<AuthStackParamList, AuthStackScreens.PasswordReset>;
export type PasswordResetScreenProps = {
  route: PasswordResetScreenRouteProp;
  navigation: PasswordResetScreenNavigationProp;
};

export type NewPasswordScreenRouteProp = RouteProp<AuthStackParamList, AuthStackScreens.NewPassword>;
export type NewPasswordScreenNavigationProp = StackNavigationProp<AuthStackParamList, AuthStackScreens.NewPassword>;
export type NewPasswordScreenProps = {
  route: NewPasswordScreenRouteProp;
  navigation: NewPasswordScreenNavigationProp;
};
