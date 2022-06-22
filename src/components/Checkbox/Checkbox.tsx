import {Pressable, View} from 'react-native';
import {useTheme} from 'react-native-paper';
import React from 'react';
import {Props} from '.';

const Checkbox = (props: Props) => {
  const theme = useTheme();

  /**
   * 是否选中
   */
  const isChecked = props.isChecked ?? true;

  /**
   * 点击事件
   */
  const onPress = () => {
    props.onChange && props.onChange(!isChecked);
  };

  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            borderColor: theme.colors.primary,
            borderWidth: 2,
            borderRadius: 6,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          },
          {
            backgroundColor: isChecked ? theme.colors.primary : 'transparent',
          },
          props.style,
        ]}>
        <View
          style={[
            {
              width: 8,
              height: 4,
              borderBottomWidth: 2,
              borderLeftWidth: 2,
            },
            {
              transform: [
                {
                  rotate: isChecked ? '-45deg' : '0deg',
                },
              ],
            },
            {
              borderColor: isChecked ? 'white' : 'transparent',
            },
          ]}
        />
      </View>
    </Pressable>
  );
};

export default Checkbox;
