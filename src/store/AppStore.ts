import { action, makeObservable, observable } from 'mobx';
import { NotificationAlertProps } from '../ui-kit/Alerts/NotificationAlert';
import { DefaultNotificationAlertProps } from '../utils';
import RootStore from './RootStore';
import Config from 'react-native-config';
import { BaseService } from '../services';
import { RNKeycloak } from '../lib/rnkeycloak';

export class AppStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = false;

  @observable
  config = {
    apiUrl: Config.API_URL,
    keycloak: {
      redirectUrl: Config.KEYCLOAK_REDIRECT_URL,
      clientId: Config.KEYCLOAK_CLIENT_ID,
      realm: Config.KEYCLOAK_REALM,
      url: Config.KEYCLOAL_URL,
    },
  };

  @observable
  keycloak = new RNKeycloak({
    url: this.config.keycloak.url,
    realm: this.config.keycloak.realm,
    clientId: this.config.keycloak.clientId,
  });

  @observable
  showNoRightsScreen: boolean = false;

  @observable
  notificationAlert: NotificationAlertProps = DefaultNotificationAlertProps;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeObservable(this);
  }

  @action
  setLoading = (state: boolean) => {
    this.loading = state;
  };

  @action
  setConfig = config => {
    this.config = config;
    this.setKeycloak(
      new RNKeycloak({
        url: config.keycloak.url,
        realm: config.keycloak.realm,
        clientId: config.keycloak.clientId,
      })
    );
    BaseService.apiPath = config.apiUrl;
  };

  @action
  setKeycloak = config => {
    this.keycloak = config;
  };

  @action
  setShowNoRightsScreen = (state: boolean) => {
    this.showNoRightsScreen = state;
  };

  @action
  showNotificationAlert = ({ visible = true, ...otherParams }: NotificationAlertProps) => {
    this.notificationAlert = {
      ...otherParams,
      visible: true,
    };
  };

  @action
  hideNotificationAlert = () => {
    this.notificationAlert = DefaultNotificationAlertProps;
  };
}

export default AppStore;
