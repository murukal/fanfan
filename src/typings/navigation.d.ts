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
  excludeIds?: number[];
}

/**
 * 路由的ts声明
 */
export type NavigationMetadata = NavigationProp<{
  layout:
    | {
        screen: 'home' | 'setting';
      }
    | undefined;

  billings: undefined;

  billing: BillingProp;

  transaction: TransactionProp;

  transactions: TransactionsProp;

  users: UsersProp | undefined;

  login: undefined;

  register: undefined;
}>;
