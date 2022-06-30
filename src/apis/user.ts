import {gql, TypedDocumentNode} from '@apollo/client';
import {fetcher} from '.';
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
 * 获取用户信息
 */
const WHO_AM_I: TypedDocumentNode<{
  whoAmI: User;
}> = gql`
  query WhoAmI {
    whoAmI {
      id
      username
      emailAddress
      avatar
      moneyProfile {
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
    }
  }
`;

// 强制不适用缓存
export const whoAmI = async () =>
  await fetcher.query({
    query: WHO_AM_I,
    fetchPolicy: 'no-cache',
  });
