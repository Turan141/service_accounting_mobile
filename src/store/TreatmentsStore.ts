import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import { showMessage } from 'react-native-flash-message';
import { navigate } from '../navigation/RootNavigation';
import { TASKS_STACK } from '../navigation/stacks';
import { DeicingTreatmentFormValues } from '../screens/poo/PooAgentScreen';
import { treatmentsService } from '../services';
import {
  FlightModel,
  GetDeicingTreatmentByIdRequestParams,
  TaskStatusesEnum,
  TreatmentModel,
  UpdateDeicingTreatmentRequestBody,
} from '../services/data';
import RootStore from './RootStore';

export class TreatmentsStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = false;

  @observable
  controlLoading: boolean = false;

  @observable
  deicingTreatment: TreatmentModel = null;

  @observable
  deicingTreatmentUpdateReason: string = null;

  @observable
  deicingTreatmentFormValues: DeicingTreatmentFormValues = null;

  @observable
  deicingTreatments: FlightModel[] = [];

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  setDeicingTreatmentUpdateReason = async (reason: string) => {
    this.deicingTreatmentUpdateReason = reason;
  };

  @action
  setControlLoading = async (state: boolean) => {
    this.controlLoading = state;
  };

  @action
  syncDeicingTreatmentFormValues = async (values: DeicingTreatmentFormValues) => {
    this.deicingTreatmentFormValues = values;
  };

  @action
  getDeicingTreatments = async () => {
    const { appStore } = this.rootStore;

    try {
      appStore.setLoading(true);

      const data = await treatmentsService.getDeicingTreatments();

      console.log({
        data: toJS(data),
      });

      runInAction(() => {
        this.deicingTreatments = data;
      });
    } catch (error) {
      // Global error handler
    } finally {
      appStore.setLoading(false);
    }
  };

  @action
  getDeicingTreamentById = async (params: GetDeicingTreatmentByIdRequestParams) => {
    try {
      this.setLoading(true);

      const data = await treatmentsService.getById(params);

      console.log({
        data: toJS(data),
      });

      runInAction(() => {
        this.deicingTreatment = data;
      });
    } catch (error) {
      // Global error handler
    } finally {
      this.setLoading(false);
    }
  };

  @action
  updateDeicingTreament = async (body: UpdateDeicingTreatmentRequestBody) => {
    const { appStore } = this.rootStore;

    try {
      this.setControlLoading(true);

      const data = await treatmentsService.updateDeicingTreatment({
        ...body,
        editReason: this.deicingTreatmentUpdateReason,
      });

      if (body.signImage) {
        console.log('ЗАПРОС НА СОХРАНЕНИЕ ПОДПИСИ ', body);
        await treatmentsService.saveSign({
          treatmentId: body.id,
          signedFullName: body.signedFIO,
          signedPositionName: body.signedPosition,
          url: body.signImage,
        });
      }

      await appStore.showNotificationAlert({
        type: body.signImage ? 'success' : 'warning',
        message: `Успешно сохранено. ${body.signImage ? 'Подпись есть.' : 'Подписи нет.'}`,
      });

      runInAction(() => {
        this.deicingTreatment = data;
      });

      navigate(TASKS_STACK);
    } catch (error) {
      // Global error handler
    } finally {
      this.setControlLoading(false);
    }
  };

  @action
  startDeicingTreament = async (id: number) => {
    try {
      this.setControlLoading(true);

      await treatmentsService.startDeicingTreatment({
        treatmentId: id,
      });

      runInAction(() => {
        this.deicingTreatment = {
          ...this.deicingTreatment,
          status: TaskStatusesEnum.InProgress,
        };
      });
    } catch (error) {
      // Global error handler
    } finally {
      this.setControlLoading(false);
    }
  };

  @action
  stopDeicingTreament = async (id: number) => {
    try {
      this.setControlLoading(true);

      await treatmentsService.stopDeicingTreatment({
        treatmentId: id,
      });

      runInAction(() => {
        this.deicingTreatment = {
          ...this.deicingTreatment,
          status: TaskStatusesEnum.Done,
        };
      });
    } catch (error) {
      // Global error handler
    } finally {
      this.setControlLoading(false);
    }
  };
}

export default TreatmentsStore;
