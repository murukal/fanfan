import merge from 'deepmerge';
import {DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import {DefaultTheme as PaperDefaultTheme} from 'react-native-paper';

export {default} from './Routes';

/**
 * 设置主题
 */
export const combinedDefaultTheme = merge(
  merge(PaperDefaultTheme, NavigationDefaultTheme),
  {
    colors: {
      background: 'white',
    },
  },
);
