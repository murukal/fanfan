// third
import {gql} from '@apollo/client';
import type {TypedDocumentNode} from '@apollo/client';
// project
import {fetcher} from '.';
import type {LoginInput, RegisterInput, User} from '../typings/auth';

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
      email
      avatar
      moneyProfile {
        defaultBilling {
          id
          name
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

/**
 * 登录
 */
const LOGIN: TypedDocumentNode<
  {
    login: string;
  },
  {
    loginInput: LoginInput;
  }
> = gql`
  mutation Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput)
  }
`;

export const login = (loginInput: LoginInput) =>
  fetcher.mutate({
    mutation: LOGIN,
    variables: {
      loginInput,
    },
  });

/**
 * 注册
 */
const REGISTER: TypedDocumentNode<
  {
    register: string;
  },
  {
    registerInput: RegisterInput;
  }
> = gql`
  mutation Register($registerInput: RegisterInput!) {
    register(registerInput: $registerInput)
  }
`;

export const register = (registerInput: RegisterInput) =>
  fetcher.mutate({
    mutation: REGISTER,
    variables: {
      registerInput,
    },
  });
