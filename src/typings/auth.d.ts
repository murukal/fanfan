import {Core} from '.';
import {Billing} from './billing';

export interface User extends Core {
  username: string;
  email: string;
  avatar: string;
  moneyProfile: {
    defaultBilling: Billing;
  };
}

export interface LoginInput {
  keyword: string;
  password: string;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}
