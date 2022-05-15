import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';
import {Button, Text, TextInput, useTheme} from 'react-native-paper';
import {NavigationMetadata} from '../../typings/navigation';

const Register = () => {
  const navigation = useNavigation<NavigationMetadata>();
  const theme = useTheme();

  /**
   * 前往登录
   */
  const onGo2Login = () => {
    navigation.navigate('Account', {
      screen: 'Login',
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 64,
        paddingBottom: 32,
        paddingHorizontal: 32,
        justifyContent: 'space-between',
      }}>
      {/* 标题 */}
      <View>
        <Text style={styles.title}>Create your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* 登录form */}
      <View>
        <TextInput
          autoFocus={true}
          mode="outlined"
          label="用户名/邮箱"
          placeholder="请输入用户名/邮箱"
          style={{
            marginBottom: 16,
          }}
        />

        <TextInput
          mode="outlined"
          label="密码"
          placeholder="请输入密码"
          style={{
            marginBottom: 16,
          }}
        />

        <TextInput
          mode="outlined"
          label="二次确认密码"
          placeholder="请输入二次确认密码"
          style={{
            marginBottom: 16,
          }}
        />

        <Button
          mode="contained"
          onPress={() => console.log('Pressed')}
          contentStyle={{
            height: 56,
          }}
          style={{
            borderRadius: 9999,
            marginBottom: 16,
          }}>
          注 册
        </Button>
      </View>

      {/* 跳转 */}
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text>
          已有账号？前往{' '}
          <Text
            onPress={onGo2Login}
            style={{
              color: theme.colors.primary,
            }}>
            登陆
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Register;
