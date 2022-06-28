import {gql, TypedDocumentNode} from '@apollo/client';
import {CreateShareInput} from '../typings/share';

export enum TargetType {
  Billing = 'billing',
}

/**
 * 创建分享
 */
export const CREATE: TypedDocumentNode<
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
