import {Direction} from '../utils';
import {User} from './auth';
import {Category} from './category';

export interface Transaction {
  id: number;
  billingId: number;
  amount: number;
  direction: Direction;
  category: Category;
  createdAt: string;
  remark?: string;
  createdBy: User;
}

export interface CreateTransactionInput
  extends Pick<
    Transaction,
    'billingId' | 'categoryId' | 'amount' | 'direction' | 'remark'
  > {}

export interface UpdateTransactionInput
  extends Omit<CreateTransactionInput, 'billingId'> {}

export interface FilterTransactionInput {
  billingId: number;
  directions: Direction[];
  from?: Date;
  to?: Date;
}
