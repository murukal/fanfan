import React from 'react';
import {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {Text, TextInput, Button, useTheme} from 'react-native-paper';
import Checkbox from '../../components/Checkbox';
import {login} from '../../apis/auth';
import {errorsNotify, reinitialize} from '../../utils';
import {useNavigation} from '../../utils/navigation';

const Login = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [keyword, setKeyword] = useState('');
  const [password, setPassword] = useState('');
  const [isAutoLogin, setIsAutoLogin] = useState(false);

  /**
   * 前往注册
   */
  const onGo2Register = () => {
    navigation.navigate('Account', {
      screen: 'Register',
    });
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
    const result = await login({
      keyword,
      password,
    });

    if (!result.data) {
      errorsNotify(result.errors);
      return;
    }

    reinitialize(result.data.login, isAutoLogin);
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
          label="用户名/邮箱"
          placeholder="请输入用户名/邮箱"
          autoCapitalize="none"
          theme={{
            roundness: 28,
          }}
          style={{
            marginBottom: 12,
          }}
        />

        <TextInput
          value={password}
          onChange={onPasswordChange}
          mode="outlined"
          label="密码"
          placeholder="请输入密码"
          secureTextEntry
          autoCapitalize="none"
          theme={{
            roundness: 28,
          }}
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
            borderRadius: 9999,
          }}>
          登 录
        </Button>
      </View>

      {/* 跳转 */}
      <View
        style={{
          alignItems: 'center',
        }}>
        <Text>
          没有账号？前往{' '}
          <Text
            style={{
              color: theme.colors.primary,
            }}
            onPress={onGo2Register}>
            注册
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

export default Login;
