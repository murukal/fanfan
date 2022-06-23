// third
import {gql} from '@apollo/client';
import type {TypedDocumentNode} from '@apollo/client';
// project
import type {LoginInput, RegisterInput, SendCaptchaArgs} from '../typings/auth';

/**
 * 登录
 */
export const LOGIN: TypedDocumentNode<
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

/**
 * 发送验证码
 */
export const SEND_CAPTCHA: TypedDocumentNode<
  {
    sendCaptcha: Date;
  },
  SendCaptchaArgs
> = gql`
  mutation SendCaptcha($emailAddress: String!) {
    sendCaptcha(emailAddress: $emailAddress)
  }
`;
