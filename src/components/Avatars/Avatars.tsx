import {Props} from '.';
import React, {useMemo} from 'react';
import Avatar from '../Avatar';
import {View} from 'react-native';

const Avatars = (props: Props) => {
  const users = useMemo(() => props.users, [props.users]);
  const size = useMemo(() => props.size || 36, [props.size]);

  /**
   * 用户列表为空
   */
  if (!users) {
    return null;
  }

  /**
   * 返回用户头像组
   */
  return (
    <View
      style={{
        transform: [
          {
            translateX: -2,
          },
        ],
        flexDirection: 'row',
        paddingVertical: 4,
      }}>
      {users.map((user, index) => {
        const translateX = -((size / 2 + 2) * index);

        return (
          <Avatar
            avatar={user.avatar}
            key={user.id}
            size={size}
            style={[
              {
                position: 'relative',
                padding: 2,
                borderRadius: 999,
                backgroundColor: 'white',
              },
              {
                transform: [
                  {
                    translateX,
                  },
                ],
              },
            ]}
          />
        );
      })}
    </View>
  );
};

export default Avatars;
