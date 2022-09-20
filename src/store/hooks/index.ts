import { useStore } from '..';
import AppStore from '../AppStore';
import TenderStore from '../TenderStore';
import LoginStore from '../LoginStore';
import ServicesStore from '../ServicesStore';
import TasksStore from '../TasksStore';
import TreatmentsStore from '../TreatmentsStore';
import UserStore from '../UserStore';
import DictionariesStore from '../DictionariesStore';
import FlightStore from '../FlightStore';

export function useTasksStore(): TasksStore {
  return useStore().tasksStore;
}

export function useAppStore(): AppStore {
  return useStore().appStore;
}

export function useLoginStore(): LoginStore {
  return useStore().loginStore;
}

export function useTendersStore(): TenderStore {
  return useStore().tendersStore;
}

export function useServicesStore(): ServicesStore {
  return useStore().servicesStore;
}

export function useTreatmentsStore(): TreatmentsStore {
  return useStore().treatmentsStore;
}

export function useUserStore(): UserStore {
  return useStore().userStore;
}

export function useDictionariesStore(): DictionariesStore {
  return useStore().dictionaryStore;
}

export function useFlightStore(): FlightStore {
  return useStore().flightStore;
}
