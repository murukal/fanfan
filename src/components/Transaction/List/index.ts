import {ReactElement} from 'react';

export {default} from './List';

export interface Props {
  padding?: number;
  billingId: number;
  ListHeaderComponent?: ReactElement;
}

export const limit = 20;
