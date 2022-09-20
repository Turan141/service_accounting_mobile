import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import RootStore from './RootStore';
import { ReferenceView, RequestPaginationReference } from '../typings/swagger/api';
import dictionariesService, { DictionaryType } from '../services/dictionaries/DictionariesService';
import { TenderTypesEnum } from '../services/data';
import { logToConsole } from '../utils/formatting';

export class DictionariesStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = false;

  @observable
  parking: ReferenceView[] = [];

  @observable
  heatingSpots: ReferenceView[] = [];

  @observable
  toiletOptions: ReferenceView[] = [];

  @observable
  passengersCategory: ReferenceView[] = [];

  @observable
  waterSystemOptions: ReferenceView[] = [];

  @observable
  outstaffingOptions: ReferenceView[] = [];

  @observable
  laddersOptions: ReferenceView[] = [];

  @observable
  baggageCarOptions: ReferenceView[] = [];

  @observable
  drainContainerOptions: ReferenceView[] = [];

  @observable
  compressedGasOptions: ReferenceView[] = [];

  @observable
  maintenanceKitOptions: ReferenceView[] = [];

  @observable
  currentOptions: ReferenceView[] = [];

  @observable
  onboardTypes: ReferenceView[] = [];

  @observable
  showResults: boolean = true;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  setShowResults = async (state: boolean) => {
    this.showResults = state;
  };

  @action
  setCurrentOptions = (items: ReferenceView[]) => {
    this.currentOptions = items;
  };

  @action
  getDictionaryItemsByType = async (
    dictionaryMasterCode: DictionaryType | TenderTypesEnum,
    filter: RequestPaginationReference = {
      skip: 0,
      take: 40,
    }
  ) => {
    try {
      const data = await dictionariesService.getDictionaryItemsByType(filter, dictionaryMasterCode);
      runInAction(() => {
        switch (dictionaryMasterCode) {
          case 'AircraftParkings':
            this.parking = toJS(data);
            break;
          case 'Transports':
            this.onboardTypes = toJS(data);
            break;
          case TenderTypesEnum.Heating:
            this.heatingSpots = toJS(data);
            break;
          case TenderTypesEnum.Toilet:
            this.toiletOptions = toJS(data);
            break;
          case TenderTypesEnum.WaterSystemMaintenance:
            this.waterSystemOptions = toJS(data);
            break;
          case 'PassengerCategories':
            this.passengersCategory = toJS(data);
            break;
          case TenderTypesEnum.Outstaffing:
            this.outstaffingOptions = toJS(data);
            break;
          case TenderTypesEnum.ProvisionOfBaggageCar:
            this.baggageCarOptions = toJS(data);
            break;
          case TenderTypesEnum.DrainContainer:
            this.drainContainerOptions = toJS(data);
            break;
          case TenderTypesEnum.LaddersProvision:
            this.laddersOptions = toJS(data);
            break;
          case TenderTypesEnum.CompressedGas:
            this.compressedGasOptions = toJS(data);
            break;
          case TenderTypesEnum.MaintenanceKit:
            this.maintenanceKitOptions = toJS(data);
            break;
        }
        this.showResults = true;
      });
    } catch (error) {
      console.log('error dictionary getting items', error);
    } finally {
    }
  };
}

export default DictionariesStore;
