import { action, makeObservable, observable, runInAction, toJS } from 'mobx';
import RootStore from './RootStore';
import {
  Flight,
  FlightFilterData,
  Flights,
  Lir,
  Lirs,
  RequestPaginationOfDocumentFilter,
} from '../typings/swagger/api';
import flightsService from '../services/flights/FlightsService';
import { logToConsole } from '../utils/formatting';

export class FlightStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = false;

  @observable
  flights: Flight[] = [];

  @observable
  lirs: Lir[] = [];

  @observable
  currentFlight: Flight = null;

  @observable
  showResults: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  setFlights = async (flights: Flight[]) => {
    this.flights = flights;
  };

  @action
  setLirs = async (lirs: Lir[]) => {
    this.lirs = lirs;
  };

  @action
  setCurrentFlight = async (flight: Flight) => {
    this.currentFlight = flight;
  };

  @action
  setShowResults = async (state: boolean) => {
    this.showResults = state;
  };

  @action
  getFlights = async (request: FlightFilterData) => {
    try {
      await this.setLoading(true);
      const data = await flightsService.getFlights(request);
      runInAction(() => {
        this.flights = toJS(data);
      });
    } catch (error) {
      // Global error handler
    } finally {
      await this.setLoading(false);
      await this.setShowResults(true);
    }
  };

  @action
  getLirsByFlightCode = async (flightCode: string) => {
    try {
      await this.setLoading(true);
      const mvt = await flightsService.getLirsByFlightCode({ flightCode, type: 'Mvt' });
      const ldm = await flightsService.getLirsByFlightCode({ flightCode, type: 'Ldm' });
      const lirs = await flightsService.getLirsByFlightCode({ flightCode, type: 'Lirs' });

      await this.setLirs([...mvt, ...ldm, ...lirs]);
    } catch (error) {
      // Global error handler
      console.warn('failed to get flight by master code '.toUpperCase(), error);
    } finally {
      await this.setLoading(false);
    }
  };

  @action
  getFlightByMasterCode = async (masterCode: string) => {
    try {
      await this.setLoading(true);
      const data = await flightsService.getFlightByMasterCode({ flightMasterCode: masterCode });
      await this.setCurrentFlight(data);
    } catch (error) {
      // Global error handler
      console.warn('failed to get flight by master code '.toUpperCase(), error);
    } finally {
      await this.setLoading(false);
    }
  };
}

export default FlightStore;
