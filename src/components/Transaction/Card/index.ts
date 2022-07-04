import {ViewStyle} from 'react-native';
import {Transaction} from '../../../typings/transaction';

export {default} from './Card';

export interface Props {
  onPress?: () => void;
  transaction: Transaction;
  style?: ViewStyle;
}
