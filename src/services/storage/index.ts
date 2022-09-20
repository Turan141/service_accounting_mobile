import AsyncStorage from '@react-native-async-storage/async-storage';
import { showUnhandledErrorToast } from '../errors';

const KEYS_PREFIX = '@USMART';

export class StorageService {
  /**
   * Get data from AsyncStorage by key
   *
   * @param {string} key
   */
  getItem = async (key: string) => {
    try {
      const data = await AsyncStorage.getItem(`${KEYS_PREFIX}_${key}`);

      return data ? JSON.parse(data) : null;
    } catch (e) {
      showUnhandledErrorToast();
    }
  };

  /**
   * Set data to AsyncStorage
   *
   * @param {string} key
   * @param {*} value
   */
  setItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.setItem(`${KEYS_PREFIX}_${key}`, JSON.stringify(value));
    } catch (error) {
      showUnhandledErrorToast();
    }
  };

  /**
   * Merge data with existing in AsyncStorage
   *
   * @param {string} key
   * @param {*} value
   */
  mergeItem = async (key: string, value: any) => {
    try {
      await AsyncStorage.mergeItem(`${KEYS_PREFIX}_${key}`, JSON.stringify(value));
    } catch (error) {
      showUnhandledErrorToast();
    }
  };

  /**
   * Delete data from AsyncStorage by key
   *
   * @param {string} key
   */
  removeItem = async (key: string) => {
    try {
      await AsyncStorage.removeItem(`${KEYS_PREFIX}_${key}`);
    } catch (e) {
      showUnhandledErrorToast();
    }
  };

  /**
   * Get all keys from AsyncStorage
   */
  getAllKeys = async () => {
    try {
      const data = await AsyncStorage.getAllKeys();

      return data ? data : null;
    } catch (error) {
      showUnhandledErrorToast();
    }
  };

  /**
   * Remove all from AsyncStorage
   */
  clear = async () => {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      showUnhandledErrorToast();
    }
  };
}

export default new StorageService();
