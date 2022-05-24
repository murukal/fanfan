import {
  RouteProp,
  useNavigation as useNativeNavigation,
  useRoute as useNativeRoute,
} from '@react-navigation/native';
import {NavigationMetadata} from '../typings/navigation';

/**
 * 原生的hooks需要提供ts声明，且全局一致
 * 利用ts包装一层
 */
export const useNavigation = () => {
  return useNativeNavigation<NavigationMetadata>();
};

/**
 * 原生的hooks需要提供ts声明
 */
export const useRoute = <P extends object | undefined = undefined>() => {
  return useNativeRoute<
    RouteProp<{
      params: P;
    }>
  >();
};
