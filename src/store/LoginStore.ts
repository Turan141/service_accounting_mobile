import { action, makeObservable, observable, runInAction } from 'mobx';
import { storageService, BaseService } from '../services';
import { logToConsole, objectKeysToCamelCase } from '../utils/formatting';
import RootStore from './RootStore';
import { UserRolesEnum } from '../services/data';
import Keycloak from '../lib/react-native-keycloak-plugin';

export class LoginStore {
  rootStore: RootStore = null;

  @observable
  loading: boolean = false;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeObservable(this);
  }

  errorHandlers = BaseService.commonErrorHandlers;

  @action
  setLoading = async (state: boolean) => {
    this.loading = state;
  };

  @action
  initAuth = (username, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { userStore, appStore } = this.rootStore;
        const { keycloak } = appStore;
        await this.setLoading(true);
        await this.login(username, password);

        const userInfo = await keycloak.loadUserInfo();
        const userRoles =
          keycloak?.resourceAccess && keycloak?.resourceAccess['clients-mobile']
            ? keycloak?.resourceAccess['clients-mobile']?.roles
            : [];
        if (!userRoles.includes(UserRolesEnum.Agent) && !userRoles.includes(UserRolesEnum.WorkerInCar)) {
          appStore.setShowNoRightsScreen(true);
        }

        userStore.setUser({
          ...objectKeysToCamelCase(userInfo),
          roles: userRoles,
        });

        resolve(null);
      } catch (error) {
        reject(error);
      } finally {
        await this.setLoading(false);
      }
    });
  };

  @action
  login = async (username, password) => {
    const { config, keycloak } = this.rootStore.appStore;

    const keycloakConfig = {
      'auth-server-url': config.keycloak.url,
      realm: config.keycloak.realm,
      resource: config.keycloak.clientId,
    };

    const auth = await Keycloak.login(keycloakConfig, username, password, ['openid profile email']);
    logToConsole(auth);
    await keycloak.init({ token: auth.access_token, idToken: auth.id_token, refreshToken: auth.refresh_token });
    logToConsole('after auth');
    await storageService.setItem('token', keycloak?.token);
    await storageService.setItem('refreshToken', keycloak?.refreshToken);
    await storageService.setItem('idToken', keycloak?.idToken);
  };

  // @action
  // init = async () => {
  //   const token = await storageService.getItem('token');
  //   const refreshToken = await storageService.getItem('refreshToken');
  //   const idToken = await storageService.getItem('idToken');
  //   await keycloak.init({ token, idToken, refreshToken });
  // };

  @action
  logout = async () => {
    const { userStore } = this.rootStore;
    const { config, keycloak } = this.rootStore.appStore;

    userStore.setUser(null);
    await storageService.removeItem('token');
    await keycloak?.logout();
    runInAction(() => {
      this.loading = false;
    });
  };
}

export default LoginStore;
