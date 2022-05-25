import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {UserProfile} from '../../redux/user-profile';
import React from 'react';
import {Avatar, Caption, IconButton, Paragraph} from 'react-native-paper';
import dayjs from 'dayjs';

const Welcome = () => {
  const userProfile = useSelector<State, UserProfile>(
    state => state.userProfile,
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
      }}>
      {/* 头像 */}
      {userProfile.user?.avatar ? (
        <Avatar.Image
          size={36}
          source={{
            uri: userProfile.user?.avatar,
          }}
        />
      ) : (
        <Avatar.Icon size={36} icon="account" />
      )}

      <View
        style={{
          marginLeft: 12,
          justifyContent: 'center',
        }}>
        <Caption>
          Good {dayjs().format('A') === 'AM' ? 'Morning' : 'Afternoon'} 👋
        </Caption>

        {/* 用户登录后显示用户名 */}
        {userProfile.user && <Paragraph>{userProfile.user.username}</Paragraph>}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}>
        <IconButton
          icon="cog"
          size={28}
          onPress={() => console.log('Pressed')}
        />
      </View>
    </View>
  );
};

export default Welcome;
