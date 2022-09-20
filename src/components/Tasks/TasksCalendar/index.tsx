import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fontFamilyBold } from '../../../theme';

import { TaskItem } from '..';

import { TaskStatusesEnum, TenderTypesEnum, UserRolesEnum } from '../../../services/data';
import { getDayTimes, isInTheSameTime } from '../../../utils';
import { useNavigation } from '@react-navigation/native';
import { TenderStackScreens, TasksStackScreens, FlightsStackScreens } from '../../../navigation/enums';
import { format } from 'date-fns';
import { TaskDetailsScreenNavigationProp } from '../../../navigation/props';
import { useUserStore } from '../../../store/hooks';
import { TENDER_STACK, TASKS_STACK } from '../../../navigation/stacks';
import NoDataFound from '../../NoDataFound';
import { DocumentView, Flight } from '../../../typings/swagger/api';
import SpinnerLoading from '../../../ui-kit/SpinnerLoading';
import { FLIGHT_STACK } from '../../../navigation/stacks/FlightStack';

export interface TasksCalendarProps {
  items: DocumentView[] | Flight[];
  hideTime?: boolean;
  loading: boolean;
  showResults: boolean;
  setCurrentTender?: any;
  setCurrentFlight?: any;
}

export interface CalendarItemsProps {
  time: string;
  items: DocumentView[] & Flight[];
}

const TasksCalendar: FC<TasksCalendarProps> = ({
  items,
  hideTime,
  loading,
  showResults,
  setCurrentFlight,
  setCurrentTender,
}) => {
  const navigation = useNavigation<TaskDetailsScreenNavigationProp>();
  const times = getDayTimes();
  const { user } = useUserStore();
  const [formattedTasks, setFormattedTasks] = useState<undefined | CalendarItemsProps[]>(undefined);

  useEffect(() => {
    const formattedFlights = [];
    times.forEach(time => {
      if (items.length) {
        formattedFlights.push({
          time,
          items: items.filter(item => {
            return isInTheSameTime(time, format(new Date(item?.flightDate || +item?.properties?.startPlan), 'HH:mm'));
          }),
        });
      }
    });

    setFormattedTasks(formattedFlights);
  }, [items]);

  const handleOnTaskItemPress = useCallback(
    (item: DocumentView & Flight) => {
      const taskItem = item;
      setCurrentTender && setCurrentTender(taskItem);
      setCurrentFlight && setCurrentFlight(taskItem);
      if (user.roles.includes(UserRolesEnum.Agent) && taskItem?.items) {
        // подогрев
        if (taskItem.properties.service === TenderTypesEnum.Heating) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.HeatingTender,
              params: { data: taskItem },
            });
          }
          return;
        }

        // автобусы
        if (taskItem.properties.service === TenderTypesEnum.ProvisioningMinibus) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ProvisioningMinibus,
              params: { data: taskItem },
            });
          }
          return;
        }

        // санузлы
        if (taskItem.properties.service === TenderTypesEnum.Toilet) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ToiletTender,
              params: { data: taskItem },
            });
          }
          return;
        }

        // водяная система
        if (taskItem.properties.service === TenderTypesEnum.WaterSystemMaintenance) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.WaterSystemMaintenance,
              params: { data: taskItem },
            });
          }
          return;
        }

        // охлаждение
        if (taskItem.properties.service === TenderTypesEnum.AircraftCooling) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.AircraftCooling,
              params: { data: taskItem },
            });
          }
          return;
        }

        // произвольная
        if (taskItem.properties.service === TenderTypesEnum.AnyService) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.AnyService,
              params: { data: taskItem },
            });
          }
          return;
        }

        // обеспечение воздушного запуска
        if (taskItem.properties.service === TenderTypesEnum.ProvidingAirLaunchDevice) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ProvidingAirLaunchDevice,
              params: { data: taskItem },
            });
          }
          return;
        }

        // санитарный осмотр
        if (taskItem.properties.service === TenderTypesEnum.SanitaryInspection) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.SanitaryInspection,
              params: { data: taskItem },
            });
          }
          return;
        }

        // водило
        if (taskItem.properties.service === TenderTypesEnum.DriverProviding) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.DriverProviding,
              params: { data: taskItem },
            });
          }
          return;
        }

        // техническая вода
        if (taskItem.properties.service === TenderTypesEnum.ProvisionOfProcessWater) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ProvisionOfProcessWater,
              params: { data: taskItem },
            });
          }
          return;
        }

        // удлинитель
        if (taskItem.properties.service === TenderTypesEnum.ProvidingAnExtensionCord) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ProvidingAnExtensionCord,
              params: { data: taskItem },
            });
          }
          return;
        }

        // швартовочное оборудование
        if (taskItem.properties.service === TenderTypesEnum.TieDownStrapsAndNetsRent) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.TieDownStrapsAndNetsRent,
              params: { data: taskItem },
            });
          }
          return;
        }

        // доп персонал
        if (taskItem.properties.service === TenderTypesEnum.Outstaffing) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.Outstaffing,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Предоставление спецтехники и оборудования для погрузочно-разгрузочных работ
        if (taskItem.properties.service === TenderTypesEnum.ProvisionOfBaggageCar) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ProvisionOfBaggageCar,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Емкость для слива ГСМ
        if (taskItem.properties.service === TenderTypesEnum.DrainContainer) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.DrainContainer,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Предоставление автомашины для сопровождения при буксировке ВС через ВПП
        if (taskItem.properties.service === TenderTypesEnum.ProvisioningEscortVehicle) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.ProvisioningEscortVehicle,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Предоставление передвижного источника электропитания
        if (taskItem.properties.service === TenderTypesEnum.GroundPowerUnit) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.GroundPowerUnit,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Предоставление стремянок/трапов
        if (taskItem.properties.service === TenderTypesEnum.LaddersProvision) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.LaddersProvision,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Заправка сжатым газом
        if (taskItem.properties.service === TenderTypesEnum.CompressedGas) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.CompressedGas,
              params: { data: taskItem },
            });
          }
          return;
        }

        // Техническая аптечка ВС
        if (taskItem.properties.service === TenderTypesEnum.MaintenanceKit) {
          if (taskItem.status === TaskStatusesEnum.Confirmed) {
            navigation.navigate(TASKS_STACK, {
              screen: TasksStackScreens.TaskConfirmed,
              params: { data: taskItem },
            });
          }
          if ([TaskStatusesEnum.ConfirmedPerformer, TaskStatusesEnum.Started].includes(taskItem.status)) {
            navigation.navigate(TENDER_STACK, {
              screen: TenderStackScreens.MaintenanceKit,
              params: { data: taskItem },
            });
          }
          return;
        }
      } else if (user.roles.includes(UserRolesEnum.WorkerInCar)) {
        // navigation.navigate(POO_STACK as any, {
        //   screen: PooStackScreens.PooTransportEmployee,
        //   params: {
        //     numberOfFlight: taskItem.numberOfFlight,
        //     deicingTreatmentId: taskItem?.id,
        //   },
        // });
      } else if (taskItem.flightMasterCode) {
        navigation.navigate(FLIGHT_STACK, {
          screen: FlightsStackScreens.FlightDetailsScreen,
          params: { data: taskItem },
        });
      }
    },
    [items]
  );

  if (loading) {
    return <SpinnerLoading />;
  }

  if (!loading && showResults && formattedTasks?.length === 0) {
    return <NoDataFound />;
  }

  return (
    <View style={{ paddingLeft: items.length ? 20 : 0, flex: 1 }}>
      {formattedTasks?.map(currentTime =>
        currentTime.items.length ? (
          <View style={styles.timeContainer} key={currentTime.time}>
            <View style={{ flexBasis: '15%' }}>
              {!hideTime && <Text style={styles.timeText}>{currentTime.time}</Text>}
            </View>

            <View style={styles.tasksContainer}>
              {currentTime.items.map(item => (
                <TaskItem key={item.id} item={item} onPress={() => handleOnTaskItemPress(item)} />
              ))}
            </View>
          </View>
        ) : null
      )}
    </View>
  );
};

export default TasksCalendar;

const styles = StyleSheet.create({
  timeText: {
    fontSize: 11,
    fontFamily: fontFamilyBold,
    color: colors.gray.primary,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 20,
  },
  tasksContainer: {
    paddingRight: 20,
    flexGrow: 1,
    maxWidth: '85%',
  },
});
