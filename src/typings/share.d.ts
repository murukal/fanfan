import {TargetType} from '../apis/share';
import {User} from './auth';

export interface Share {
  id: number;
  targetType: TargetType;
  targetId: number;
  sharedById: number;
  sharedBy: User;
}

export interface CreateShareInput {
  targetType: TargetType;
  targetId: number;
  sharedByIds: number[];
}
