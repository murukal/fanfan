import {useMemo} from 'react';
import {View} from 'react-native';
import {Avatar as NativeAvatar} from 'react-native-paper';
import {Props} from '.';
import React from 'react';

const Avatar = (props: Props) => {
  const avatar = useMemo(() => props.avatar, [props.avatar]);
  const size = useMemo(() => props.size || 36, [props.size]);

  return (
    <View style={props.style}>
      {/* 头像 */}
      {avatar ? (
        <NativeAvatar.Image
          size={size}
          source={{
            uri: avatar,
          }}
        />
      ) : (
        <NativeAvatar.Icon size={size} icon="account" />
      )}
    </View>
  );
};

export default Avatar;
