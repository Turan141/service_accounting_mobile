import { MaintanceTypesEnum, TaskSchema, TaskStatusesEnum, TaskStepSchema } from '../../../services/data';

export const getInProgressTasksSteps = (task: TaskSchema): TaskStepSchema[] => {
  if (!task) {
    return [];
  }

  switch (task?.type) {
    case 'ppo':
      return [
        {
          order: 1,
          label: 'Текущие условия',
          key: 'currentConditions',
        },
        {
          order: 2,
          label: 'Поверхности ВС',
          key: 'aircraftSurface',
        },
        {
          order: 3,
          label: 'Результат',
          key: 'result',
        },
      ];

    default:
      return [];
  }
};

export const getMaintenanceItemNameByType = (type: MaintanceTypesEnum) => {
  const map = {
    [MaintanceTypesEnum.CargoMail]: 'Груз / почта',
    [MaintanceTypesEnum.Towing]: 'Буксировка',
    [MaintanceTypesEnum.PowerSupply]: 'Электропитание',
    [MaintanceTypesEnum.Passengers]: 'Пассажиры',
    [MaintanceTypesEnum.BathroomService]: 'Обслуживание санузлов',
    [MaintanceTypesEnum.Luggage]: 'Багаж',
    [MaintanceTypesEnum.Ladder]: 'Трап',
    [MaintanceTypesEnum.Refueling]: 'Заправка',
    [MaintanceTypesEnum.VisualInspection]: 'Внешний осмотр',
    [MaintanceTypesEnum.Cooling]: 'Охлаждение',
    [MaintanceTypesEnum.Heating]: 'Подогрев',
    [MaintanceTypesEnum.UVZ]: 'УВЗ',
    [MaintanceTypesEnum.Oxygen]: 'Кислород',
    [MaintanceTypesEnum.Nitrogen]: 'Азот',
    [MaintanceTypesEnum.FuelDraining]: 'Слив топлива',
  };

  return map[type] ?? 'Неверный тип услуги';
};

export const getFlightStatus = (status: TaskStatusesEnum) => {
  const statusesMap = {
    [TaskStatusesEnum.CompletedWithoutSignature]: 'Выполнена без подписи',
    [TaskStatusesEnum.Completed]: 'Выполнена',
    [TaskStatusesEnum.Started]: 'В работе',
  };

  return statusesMap[status];
};
