import {Core} from '.';
import {Billing} from './billing';

export interface User extends Core {
  username: string;
  emailAddress: string;
  avatar: string;
  moneyProfile?: {
    defaultBilling?: Billing;
  };
}

/**
 * 登录入参
 */
export interface LoginInput {
  keyword: string;
  password: string;
}

/**
 * 注册入参
 */
export interface RegisterInput {
  emailAddress: string;
  captcha: string;
  password: string;
}

/**
 * 发送验证码参数
 */
export interface SendCaptchaArgs {
  emailAddress: string;
}
