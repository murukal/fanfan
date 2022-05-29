import {NavigationProp} from '@react-navigation/native';
import {TargetType} from '../apis/share';

export interface TransactionProp {
  // 交易id，可选：更新需要
  id?: number;
  // 账本id，确认交易的归属账本
  billingId: number;
}

export interface TransactionsProp {
  // 账本id
  billingId: number;
}

export type BillingProp =
  | {
      id: number;
    }
  | undefined;

export interface UsersProp {
  fromType: TargetType;
  fromId: number;
  checkedIds: number[];
}

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

  Billing: BillingProp;

  Transaction: TransactionProp;

  Transactions: TransactionsProp;

  Users: UsersProp | undefined;
}>;
