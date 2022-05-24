import {store} from '../redux';
import {initialized, notify, setRsaPublicKey} from '../redux/app';
import {authenticate, setToken} from '../redux/user-profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GraphQLError} from 'graphql';

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
 * graphql的错误消息展示
 */
export const errorsNotify = (errors?: ReadonlyArray<GraphQLError>) => {
  const dispatch = store.dispatch;

  // 提交store
  dispatch(
    notify({
      type: 'error',
      message: errors?.find(() => true)?.message || '',
    }),
  );
};
