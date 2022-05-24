import {NavigationProp} from '@react-navigation/native';

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

export interface BillingProp {
  id: number;
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

  Billing: {
    id: number;
  };

  Transaction: TransactionProp;

  Transactions: TransactionsProp;
}>;
