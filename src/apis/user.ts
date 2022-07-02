import {gql, TypedDocumentNode} from '@apollo/client';
import {PaginateOutput} from '../typings';
import {User} from '../typings/auth';
import {FilterInput} from '../typings/user';

/**
 * 获取用户列表
 */
export const USERS: TypedDocumentNode<
  {
    users: PaginateOutput<User>;
  },
  {
    filterInput: FilterInput;
  }
> = gql`
  query Users($filterInput: FilterUserInput!) {
    users(filterInput: $filterInput) {
      items {
        id
        avatar
        username
        emailAddress
      }
    }
  }
`;

/**
 * gql片段
 * 定义通用字段
 */
const MONEY_PROFILE_FIELDS = gql`
  fragment MoneyProfileFields on MoneyProfile {
    defaultBilling {
      id
      name
      createdBy {
        id
        username
      }
      shares {
        sharedBy {
          id
          avatar
        }
      }
    }
  }
`;

/**
 * 获取用户信息
 */
export const WHO_AM_I: TypedDocumentNode<{
  whoAmI: User;
}> = gql`
  ${MONEY_PROFILE_FIELDS}
  query WhoAmI {
    whoAmI {
      id
      username
      emailAddress
      avatar
      moneyProfile {
        ...MoneyProfileFields
      }
    }
  }
`;

/**
 * 更新用户信息下的记账模块信息
 */
export const MONEY_PROFILE: TypedDocumentNode<{
  whoAmI: Pick<User, 'moneyProfile'>;
}> = gql`
  ${MONEY_PROFILE_FIELDS}
  query WhoAmI {
    whoAmI {
      moneyProfile {
        ...MoneyProfileFields
      }
    }
  }
`;
