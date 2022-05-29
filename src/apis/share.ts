import {gql, TypedDocumentNode} from '@apollo/client';
import {fetcher} from '.';
import {CreateShareInput} from '../typings/share';

export enum TargetType {
  Billing = 'Billing',
}

/**
 * 创建分享
 */
const CREATE_SHARE: TypedDocumentNode<
  {
    createShare: boolean;
  },
  {
    createShareInput: CreateShareInput;
  }
> = gql`
  mutation CreateShare($createShareInput: CreateShareInput!) {
    createShare(createShareInput: $createShareInput)
  }
`;

export const create = (createShareInput: CreateShareInput) =>
  fetcher.mutate({
    mutation: CREATE_SHARE,
    variables: {
      createShareInput,
    },
  });
