import {StyleProp, ViewStyle} from 'react-native';

export {default} from './Avatar';

export interface Props {
  avatar?: string;
  size?: number;
  style?: StyleProp<ViewStyle> | undefined;
}
