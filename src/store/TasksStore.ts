import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import { TaskSchema } from '../services/data';
import tasksService from '../services/tasks/TasksService';
import RootStore from './RootStore';

export enum InProgressTaskStepsEnum {
  CurrentConditions = 'currentConditions',
  AircraftSurface = 'aircraftSurface',
  Result = 'result',
  Towing = 'towing',
}

export class TasksStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = true;

  @observable
  noSignTasks: TaskSchema[] = [];

  @observable
  currentTask: TaskSchema = null;

  @observable
  inProgressTaskCurrentStep: InProgressTaskStepsEnum = InProgressTaskStepsEnum.CurrentConditions;

  @observable
  isSearchEnabled: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  setIsSearchEnabled = async (state: boolean) => {
    this.isSearchEnabled = state;
  };

  @action
  moveToTheNextStep = async () => {
    if (this.inProgressTaskCurrentStep === InProgressTaskStepsEnum.CurrentConditions)
      this.inProgressTaskCurrentStep = InProgressTaskStepsEnum.AircraftSurface;
  };

  @action
  setInProgressTaskCurrentStep = async (step: InProgressTaskStepsEnum) => {
    this.inProgressTaskCurrentStep = step;
  };

  @action
  getNoSignTasks = async () => {
    try {
      this.setLoading(true);

      const response = await tasksService.getNoSignTasks();

      runInAction(() => {
        this.noSignTasks = response;
      });
    } catch (error) {
      // Global error handler

      console.log(error);
    } finally {
      this.setLoading(false);
    }
  };

  @action
  getTaskById = async (id: number) => {
    try {
      this.setLoading(true);

      const response = await tasksService.getById({
        id,
      });

      console.log(response);

      runInAction(() => {
        this.currentTask = toJS(response);
      });
      this.setLoading(false);
    } catch (error) {
      // Global error handler
      this.setLoading(false);
    }
  };
}

export default TasksStore;
