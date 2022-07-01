import {gql, TypedDocumentNode} from '@apollo/client';
import {PaginateInput, PaginateOutput} from '../typings';
import {
  CreateTransactionInput,
  FilterTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from '../typings/transaction';

/**
 * 创建交易
 */
export const CREATE: TypedDocumentNode<
  {
    createTransaction: Transaction;
  },
  {
    createTransactionInput: CreateTransactionInput;
  }
> = gql`
  mutation ($createTransactionInput: CreateTransactionInput!) {
    createTransaction(createTransactionInput: $createTransactionInput) {
      id
      billingId
      categoryId
      amount
    }
  }
`;

/**
 * 更新交易
 */
export const UPDATE: TypedDocumentNode<
  {
    updateTransaction: boolean;
  },
  {
    id: number;
    updateTransactionInput: UpdateTransactionInput;
  }
> = gql`
  mutation ($id: Int!, $updateTransactionInput: UpdateTransactionInput!) {
    updateTransaction(id: $id, updateTransactionInput: $updateTransactionInput)
  }
`;

/**
 * 查询交易
 */
export const TRANSACTIONS: TypedDocumentNode<
  {
    transactions: PaginateOutput<Transaction>;
  },
  {
    filterInput: FilterTransactionInput;
    paginateInput: PaginateInput;
  }
> = gql`
  query Transactions(
    $filterInput: FilterTransactionInput!
    $paginateInput: PaginateInput!
  ) {
    transactions(filterInput: $filterInput, paginateInput: $paginateInput) {
      items {
        id
        direction
        category {
          icon
        }
        createdAt
        amount
      }
    }
  }
`;

/**
 * 查询交易明细
 */
export const TRANSACTION: TypedDocumentNode<
  {
    transaction: Transaction;
  },
  {
    id: number;
  }
> = gql`
  query Transaction($id: Int!) {
    transaction(id: $id) {
      id
      direction
      category {
        id
      }
      amount
      remark
    }
  }
`;
