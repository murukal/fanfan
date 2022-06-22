import {ViewStyle} from 'react-native';

export {default} from './Checkbox';

export interface Props {
  isChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
  style?: ViewStyle;
}
