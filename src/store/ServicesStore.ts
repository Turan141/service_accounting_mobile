import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import { servicesService } from '../services';
import { PhotofixationImage, ServiceModel } from '../services/data';
import RootStore from './RootStore';

export class ServicesStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = true;

  @observable
  services: ServiceModel[] = [];

  @observable
  servicesServices: ServiceModel[] = [];

  @observable
  currentService: ServiceModel = null;

  @observable
  photofixationImages: PhotofixationImage[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  getServicesByFlightId = async (id: number) => {
    const { tendersStore } = this.rootStore;

    try {
      this.setLoading(true);

      await tendersStore.getFlightById(id);
      const data = await servicesService.getByFlightId({
        id,
      });

      console.log('SERVICESSSSSSS       ', {
        data: toJS(data),
      });

      runInAction(() => {
        this.services = toJS(data);
      });
    } catch (error) {
      // Global error handler
    } finally {
      this.setLoading(false);
    }
  };

  @action
  getServicesServicesByFlightId = async (id: number) => {
    const { tendersStore } = this.rootStore;

    try {
      this.setLoading(true);

      await tendersStore.getFlightById(id);
      const data = await servicesService.getByFlightId({
        id,
      });

      console.log('SERVICESSSSSSS       ', {
        data: toJS(data),
      });

      runInAction(() => {
        this.servicesServices = toJS(data);
      });
    } catch (error) {
      // Global error handler
    } finally {
      this.setLoading(false);
    }
  };

  @action
  getPhotofixationImages = async () => {
    const { appStore } = this.rootStore;

    try {
      appStore.setLoading(true);

      const data = await servicesService.getImages({
        take: 10,
        skip: 0,
      });

      console.log({
        data: toJS(data),
      });

      runInAction(() => {
        this.photofixationImages = toJS(data);
      });
    } catch (error) {
      // Global error handler
    } finally {
      appStore.setLoading(false);
    }
  };
}

export default ServicesStore;
