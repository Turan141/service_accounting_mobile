import { action, makeObservable, observable, runInAction } from 'mobx';
import { usersService } from '../services';
import { UserModel } from '../services/data';
import RootStore from './RootStore';

export enum WorkTypesEnum {
  Treatment = 'treatment',
  Report = 'report',
  Both = 'both',
}

export class UserStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = true;

  @observable
  user: UserModel = null;

  @observable
  workType: WorkTypesEnum = WorkTypesEnum.Both;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @action
  setLoading = (state: boolean) => {
    this.loading = state;
  };

  @action
  setUser = (user: UserModel) => {
    this.user = user;
  };

  @action
  setWorkType = (workType: WorkTypesEnum) => {
    this.workType = workType;
  };

  @action
  getUserInfoById = async (id: number) => {
    try {
      this.setLoading(true);

      const data = await usersService.getById({ id });

      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      // Global error handler
    } finally {
      this.setLoading(false);
    }
  };
}

export default UserStore;
