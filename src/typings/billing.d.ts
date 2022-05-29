import {User} from './auth';
import {Share} from './share';

export interface Billing {
  id: number;
  name: string;
  createdById: number;
  createdBy: User;
  shares?: Share[];
  createdAt: string;
}

export interface CreateBillingInput extends Pick<Billing, 'name'> {}
