import {NavigationProp} from '@react-navigation/native';

/**
 * 路由的ts声明
 */
export type NavigationMetadata = NavigationProp<{
  Layout:
    | {
        screen: 'Home' | 'Setting';
      }
    | undefined;

  Account:
    | {
        screen: 'Login' | 'Register';
      }
    | undefined;

  Billings: undefined;

  Billing: undefined;

  Transaction: undefined;
}>;
