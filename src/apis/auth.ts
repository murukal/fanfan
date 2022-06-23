// third
import {gql} from '@apollo/client';
import type {TypedDocumentNode} from '@apollo/client';
// project
import {fetcher} from '.';
import type {LoginInput, RegisterInput} from '../typings/auth';
import {AppID} from '../assets';

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
    context: {
      appId: AppID.Boomemory,
    },
  });

/**
 * 注册
 */
export const REGISTER: TypedDocumentNode<
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
