import React, {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {Text, TextInput, Button, useTheme} from 'react-native-paper';
import Checkbox from '../../components/Checkbox';
import {LOGIN} from '../../apis/auth';
import {Notify, reinitialize} from '../../utils';
import {useNavigation} from '../../utils/navigation';
import {useMutation} from '@apollo/client';

const Login = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [keyword, setKeyword] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [isAutoLogin, setIsAutoLogin] = useState(false);
  const [login] = useMutation(LOGIN, {
    context: {
      appId: 'boomemory',
    },
  });

  /**
   * 前往注册
   */
  const onGo2Register = () => {
    navigation.navigate('register');
  };

  /**
   * 用户名/邮箱发生变更
   */
  const onKeywordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setKeyword(e.nativeEvent.text);
  };

  /**
   * 密码发生变更
   */
  const onPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setPassword(e.nativeEvent.text);
  };

  /**
   * checkbox变更
   */
  const onIsAutoLoginChange = (autoLogin: boolean) => {
    setIsAutoLogin(autoLogin);
  };

  /**
   * 登录
   */
  const onLogin = async () => {
    const res = await login({
      variables: {
        loginInput: {
          keyword,
          password,
        },
      },
    }).catch((error: Error) => {
      Notify.error({
        title: error.message,
      });
      return null;
    });

    reinitialize(res?.data?.login, isAutoLogin);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 32,
      }}>
      {/* 标题 */}
      <View
        style={{
          marginBottom: 32,
        }}>
        <Text style={styles.title}>Login to your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* 登录form */}
      <View
        style={{
          marginBottom: 32,
        }}>
        <TextInput
          value={keyword}
          onChange={onKeywordChange}
          mode="outlined"
          placeholder="用户名/邮箱"
          autoCapitalize="none"
          style={{
            marginBottom: 12,
          }}
        />

        <TextInput
          value={password}
          onChange={onPasswordChange}
          mode="outlined"
          placeholder="密码"
          secureTextEntry={!isPasswordVisiable}
          autoCapitalize="none"
          right={
            <TextInput.Icon
              onPress={() => {
                setIsPasswordVisiable(prev => !prev);
              }}
              name={isPasswordVisiable ? 'eye' : 'eye-off'}
            />
          }
        />

        <View
          style={{
            marginVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Checkbox
            isChecked={isAutoLogin}
            onChange={onIsAutoLoginChange}
            style={{
              marginRight: 8,
            }}
          />

          <Text>记住我</Text>
        </View>

        <Button
          mode="contained"
          onPress={onLogin}
          contentStyle={{
            height: 56,
          }}
          style={{
            borderRadius: 99,
          }}>
          登 录
        </Button>
      </View>

      {/* 跳转 */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>没有账号？前往 </Text>

        <Text
          style={{
            color: theme.colors.primary,
          }}
          onPress={onGo2Register}>
          注册
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

export default Login;
