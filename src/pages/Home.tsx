import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Avatar, Caption, Paragraph, IconButton} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Services from '../components/Services';
import {State} from '../redux';
import {UserProfile} from '../redux/user-profile';
import BillingDefault from '../../src/components/Billing/Default';

const Home = () => {
  const userProfile = useSelector<State, UserProfile>(
    state => state.userProfile,
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
        }}>
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
            }}>
            <Caption>Good Morning 👋</Caption>
            <Paragraph>{userProfile.user?.username}</Paragraph>
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

        {/* 默认账本 */}
        <BillingDefault />

        {/* 功能区 */}
        <Services />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
