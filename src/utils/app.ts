import {store} from '../redux';
import {initialized, setRsaPublicKey} from '../redux/app';
import {
  authenticate,
  setToken,
  logout as logoutAction,
} from '../redux/user-profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const TOKEN_KEY = 'FANFAN_TOKEN';

/**
 * 应用初始化
 */
export const initialize = async () => {
  const dispatch = store.dispatch;
  // 在redux中存储token
  await dispatch(setToken());
  // 用户信息
  await dispatch(authenticate());
  // 在redux中存储rsa公钥
  await dispatch(setRsaPublicKey());
  // 在redux中存储应用初始化标识
  dispatch(initialized());
};

/**
 * 应用再次初始化
 */
export const reinitialize = async (token?: string, isAutoLogin?: boolean) => {
  if (!token) {
    return;
  }

  // 在应用缓存中重新存储token
  await AsyncStorage.removeItem(TOKEN_KEY);
  isAutoLogin && (await AsyncStorage.setItem(TOKEN_KEY, token));

  const dispatch = store.dispatch;
  // 在redux中存储token
  await dispatch(setToken(token));
  // 用户信息
  await dispatch(authenticate());
};

/**
 * 退出登陆
 */
export const logout = async () => {
  await AsyncStorage.removeItem(TOKEN_KEY);

  const dispatch = store.dispatch;
  // 退出登陆
  dispatch(logoutAction());
};

export interface NotifyOptions {
  title: string;
  message?: string;
}

/**
 * 消息提醒
 */
export const Notify = {
  error: (options: NotifyOptions) => {
    Alert.alert(options.title, options.message);
  },
};
