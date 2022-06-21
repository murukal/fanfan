import {View} from 'react-native';
import React from 'react';
import Avatar from '../../../components/Avatar';
import {useSelector} from 'react-redux';
import {State} from '../../../redux';
import {User} from '../../../typings/auth';
import {Caption, Colors, Divider, List, Text} from 'react-native-paper';
import {logout} from '../../../utils';

const Signed = () => {
  const user = useSelector<State, User | undefined>(
    state => state.userProfile.user,
  );

  const onLogout = () => {
    logout();
  };

  return (
    <View>
      {/* 头像 */}
      <View
        style={{
          alignItems: 'center',
          marginTop: 32,
          marginBottom: 16,
        }}>
        <Avatar
          avatar={user?.avatar}
          size={92}
          style={{
            marginBottom: 8,
          }}
        />

        <Text
          style={{
            fontSize: 32,
            fontWeight: '700',
            marginBottom: 8,
          }}>
          {user?.username}
        </Text>

        <Caption>{user?.emailAddress}</Caption>
      </View>

      <Divider />

      <List.Section>
        {/* 修改用户信息 */}
        <List.Item
          title={() => <Text>修改信息</Text>}
          left={props => <List.Icon {...props} icon="account-edit-outline" />}
          right={props => <List.Icon {...props} icon="chevron-right" />}
        />

        <Divider />

        {/* 退出登陆 */}
        <List.Item
          title={() => (
            <Text
              style={{
                color: Colors.redA200,
              }}>
              退出登陆
            </Text>
          )}
          left={props => (
            <List.Icon
              {...props}
              color={Colors.redA200}
              icon="logout-variant"
            />
          )}
          right={props => (
            <List.Icon {...props} color={Colors.redA200} icon="chevron-right" />
          )}
          onPress={onLogout}
        />
      </List.Section>
    </View>
  );
};

export default Signed;
