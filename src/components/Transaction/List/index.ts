import {ReactElement} from 'react';

export {default} from './List';

export interface Props {
  padding?: number;
  billingId: number;
  ListHeaderComponent?: ReactElement;
  timeRange?: [Date?, Date?] | [Date?];
}

export const limit = 20;
