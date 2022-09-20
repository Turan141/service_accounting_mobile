export enum UserRolesEnum {
  Dispatcher = '0',
  Client = '1',
  Agent = '2',
  WorkerInCar = '3',
  Spectator = '4',
  ListsAdmin = '5',
}

export interface UserModel {
  id?: number;
  name?: string;
  surname?: string;
  patronymic?: string;
  fio?: string;
  roles?: UserRolesEnum[];
  dismissalDate?: string;
  isDeleted?: boolean;
  emailVerified?: false;
  familyName?: string;
  givenName?: string;
  preferredUsername: string;
  sub: string;
}
