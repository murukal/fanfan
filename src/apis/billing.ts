import {gql, TypedDocumentNode} from '@apollo/client';
import {fetcher} from '.';
import {Billing, CreateBillingInput} from '../typings/billing';

/**
 * 查询多个账本
 */
export const BILLINGS: TypedDocumentNode<{
  billings: Billing[];
}> = gql`
  query {
    billings {
      id
      name
      createdBy {
        id
        username
      }
    }
  }
`;

/**
 * 创建账本
 */
const CREATE_BILLING: TypedDocumentNode<
  {
    createBilling: Billing;
  },
  {
    createBillingInput: CreateBillingInput;
  }
> = gql`
  mutation ($createBillingInput: CreateBillingInput!) {
    createBilling(createBillingInput: $createBillingInput) {
      id
    }
  }
`;

export const createBilling = (createBillingInput: CreateBillingInput) =>
  fetcher.mutate({
    mutation: CREATE_BILLING,
    variables: {
      createBillingInput,
    },
  });

/**
 * 获取账本
 */
export const BILLING: TypedDocumentNode<
  {
    billing: Billing;
  },
  {
    id: number;
  }
> = gql`
  query Billing($id: Int!) {
    billing(id: $id) {
      id
      name
      shares {
        sharedById
        sharedBy {
          id
          avatar
        }
      }
      createdById
      createdBy {
        id
        username
        avatar
      }
      createdAt
    }
  }
`;

/**
 * 删除账本
 */
const REMOVE: TypedDocumentNode<
  {
    removeBilling: boolean;
  },
  {
    id: number;
  }
> = gql`
  mutation RemoveBilling($id: Int!) {
    removeBilling(id: $id)
  }
`;

export const remove = (id: number) =>
  fetcher.mutate({
    mutation: REMOVE,
    variables: {
      id,
    },
  });
