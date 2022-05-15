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
