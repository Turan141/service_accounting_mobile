import { PooStackScreens, TasksStackScreens } from '../../navigation/enums';
import { POO_STACK } from '../../navigation/stacks';
import { MaintanceTypesEnum, ServiceModel, TaskStatusesEnum, TaskTypesEnum, UserRolesEnum } from '../../services/data';

interface NavigationObject {
  screen: string;
  params?: object;
}

export default (item: ServiceModel, userRoles: UserRolesEnum[]): NavigationObject => {
  const defaultObj = {
    screen: null,
  };

  if (!item) return defaultObj;

  const navObj = {
    [TaskTypesEnum.None]: {
      screen: null,
    },
    [TaskTypesEnum.Ladder]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Ladder,
      },
    },
    [TaskTypesEnum.Luggage]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Luggage,
      },
    },
    [TaskTypesEnum.Towing]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Towing,
      },
    },
    [TaskTypesEnum.Refueling]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Refueling,
      },
    },
    [TaskTypesEnum.Passengers]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Passengers,
      },
    },
    [TaskTypesEnum.Cooling]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Cooling,
      },
    },
    [TaskTypesEnum.Oxygen]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Oxygen,
      },
    },
    [TaskTypesEnum.UVZ]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.UVZ,
      },
    },
    [TaskTypesEnum.Nitrogen]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Nitrogen,
      },
    },
    [TaskTypesEnum.BathroomService]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.BathroomService,
      },
    },
    [TaskTypesEnum.PowerSupply]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.PowerSupply,
      },
    },
    [TaskTypesEnum.VisualInspection]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.VisualInspection,
      },
    },
    [TaskTypesEnum.Heating]: {
      screen: TasksStackScreens.Maintenance,
      params: {
        type: MaintanceTypesEnum.Heating,
      },
    },
    [TaskTypesEnum.WaterSystemMaintenance]: {
      screen: '',
    },
    [TaskTypesEnum.DeicingTreatment]: {
      screen: POO_STACK,
      params: {
        screen:
          item.status === TaskStatusesEnum.Done && userRoles.includes(UserRolesEnum.Agent)
            ? PooStackScreens.PooAgentResults
            : PooStackScreens.PooAgent,
        params: {
          id: item.id,
          deicingTreatmentId: item.id,
        },
      },
    },
  };

  return navObj[item.taskType] ?? defaultObj;
};
