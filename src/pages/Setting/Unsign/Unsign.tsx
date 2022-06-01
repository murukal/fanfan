import {
  Image,
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import React from 'react';
import {Button, Caption, Text} from 'react-native-paper';
import {signInWays} from '.';
import Divider from '../../../components/Divider';
import {useNavigation} from '../../../utils/navigation';

const Unsign = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  /**
   * 注册
   */
  const onGo2SignUp = () => {
    navigation.navigate('Account', {
      screen: 'Register',
    });
  };

  /**
   * 登陆
   */
  const onGo2SignIn = () => {
    navigation.navigate('Account', {
      screen: 'Login',
    });
  };

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 16,
          alignItems: 'center',
        }}>
        <Image
          style={{
            width: width - 160,
            height: width - 160,
            marginBottom: 32,
          }}
          source={require('../../../../public/images/unsign.jpeg')}
        />

        <Text
          style={{
            fontSize: 36,
            fontWeight: 'bold',
            marginBottom: 32,
          }}>
          Let‘s you in
        </Text>

        {signInWays.map(way => (
          <Button
            key={way.icon}
            mode="outlined"
            icon={way.icon}
            style={{
              width: '100%',
              borderRadius: 12,
              marginBottom: 16,
            }}
            contentStyle={{
              height: 48,
            }}>
            continue with {way.icon}
          </Button>
        ))}

        <Divider
          style={{
            marginBottom: 16,
          }}>
          <Text>or</Text>
        </Divider>

        <Button
          mode="contained"
          style={{
            width: '100%',
            borderRadius: 24,
            marginBottom: 16,
          }}
          contentStyle={{
            height: 48,
          }}
          onPress={onGo2SignIn}>
          sign in with password
        </Button>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Caption>Don't have an account?</Caption>

          <Button
            uppercase={false}
            compact
            labelStyle={{
              fontSize: 12,
            }}
            onPress={onGo2SignUp}>
            Sign up
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Unsign;
