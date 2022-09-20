import TasksStore from './TasksStore';
import AppStore from './AppStore';
import LoginStore from './LoginStore';
import TenderStore from './TenderStore';
import ServicesStore from './ServicesStore';
import TreatmentsStore from './TreatmentsStore';
import UserStore from './UserStore';
import DictionariesStore from './DictionariesStore';
import FlightStore from './FlightStore';

class RootStore {
  tasksStore = null;
  appStore = null;
  loginStore = null;
  tendersStore = null;
  servicesStore = null;
  treatmentsStore = null;
  userStore = null;
  dictionaryStore = null;
  flightStore = null;

  constructor() {
    this.tasksStore = new TasksStore(this);
    this.appStore = new AppStore(this);
    this.loginStore = new LoginStore(this);
    this.tendersStore = new TenderStore(this);
    this.servicesStore = new ServicesStore(this);
    this.treatmentsStore = new TreatmentsStore(this);
    this.userStore = new UserStore(this);
    this.dictionaryStore = new DictionariesStore(this);
    this.flightStore = new FlightStore(this);
  }
}

export const rootStore = new RootStore();

export default RootStore;
