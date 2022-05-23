import {gql, TypedDocumentNode} from '@apollo/client';
import {fetcher} from '.';
import {
  CreateTransactionInput,
  Transaction,
  UpdateTransactionInput,
} from '../typings/transaction';

/**
 * 创建交易
 */
const CREATE: TypedDocumentNode<
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

export const create = (createTransactionInput: CreateTransactionInput) =>
  fetcher.mutate({
    mutation: CREATE,
    variables: {
      createTransactionInput,
    },
  });

/**
 * 更新交易
 */
const UPDATE: TypedDocumentNode<
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

export const update = (
  id: number,
  updateTransactionInput: UpdateTransactionInput,
) =>
  fetcher.mutate({
    mutation: UPDATE,
    variables: {
      id,
      updateTransactionInput,
    },
  });
