import {Direction} from '../utils';

export interface Transaction {
  id: number;
  billingId: number;
  categoryId: number;
  amount: number;
  direction: Direction;
}

export interface CreateTransactionInput
  extends Pick<Transaction, 'billingId' | 'categoryId' | 'amount'> {}

export interface UpdateTransactionInput
  extends Omit<CreateTransactionInput, 'billingId'> {}

export interface FilterTransactionInput {
  billingId: number;
  directions: Direction[];
}
