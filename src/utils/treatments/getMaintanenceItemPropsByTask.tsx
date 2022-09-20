import React from 'react';

import { Button } from '../../ui-kit/Buttons';
import Switch from '../../ui-kit/Switch';

import { useNavigation } from '@react-navigation/core';
import { TaskDetailsScreenNavigationProp } from '../../navigation/props';
import { ServiceModel, TaskStatusesEnum, TaskTypesEnum, UserRolesEnum } from '../../services/data';
import { MaintenanceItemProps } from '../../components/Maintenance/MaintenanceItems/components/MaintenanceItem';
import { getNavigationScreenByTaskType } from '.';

interface TypesMap {
  [key: string]: MaintenanceItemProps;
}

export default (item: ServiceModel, userRoles: UserRolesEnum[]) => {
  const navigation = useNavigation<TaskDetailsScreenNavigationProp>();
  const { screen, params } = getNavigationScreenByTaskType(item, userRoles);

  const typesMap: TypesMap = {
    [TaskTypesEnum.DeicingTreatment]: {
      departureAction: [TaskStatusesEnum.Pending, TaskStatusesEnum.InProgress].includes(item.status) ? (
        <Button compact onPress={() => {}}>
          {item.status === TaskStatusesEnum.Pending ? 'Старт' : 'Стоп'}
        </Button>
      ) : null,
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Ladder]: {
      departureAction: <Switch value={false} onChange={() => {}} />,
      arrivalAction: <Switch value={false} onChange={() => {}} />,
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.WaterSystemMaintenance]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      arrivalAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
    },

    [TaskTypesEnum.Towing]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      arrivalAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Luggage]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      arrivalAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Refueling]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Passengers]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Cooling]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Oxygen]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.UVZ]: {
      arrivalTime: null,
      departureTime: item.startTime,
      departureAction: <Switch value={false} onChange={() => {}} />,
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Nitrogen]: {
      arrivalAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.BathroomService]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.PowerSupply]: {
      departureAction: (
        <Button compact onPress={() => {}}>
          Старт
        </Button>
      ),
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.VisualInspection]: {
      arrivalAction: <Switch value={false} onChange={() => {}} />,
      departureAction: <Switch value={false} onChange={() => {}} />,
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
    [TaskTypesEnum.Heating]: {
      arrivalAction: <Switch value={false} onChange={() => {}} />,
      departureAction: <Switch value={false} onChange={() => {}} />,
      onInfoPress: () => navigation.navigate(screen as any, params),
    },
  };

  return typesMap[item.taskType];
};
