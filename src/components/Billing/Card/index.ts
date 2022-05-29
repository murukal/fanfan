import {StyleProp, ViewStyle} from 'react-native';
import {Billing} from '../../../typings/billing';

export {default} from './Card';

export interface Props {
  billing: Billing;
  style?: StyleProp<ViewStyle>;
  size?: 'small' | 'large';
}
