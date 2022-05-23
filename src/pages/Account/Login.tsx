import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {Text, TextInput, Button, useTheme, Checkbox} from 'react-native-paper';
import {login} from '../../apis/auth';
import {NavigationMetadata} from '../../typings/navigation';
import {reinitialize} from '../../utils';
import {notify} from '../../redux/app';
import {useDispatch} from 'react-redux';

const Login = () => {
  const navigation = useNavigation<NavigationMetadata>();
  const dispatch = useDispatch();
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
  const onIsAutoLoginChange = () => {
    setIsAutoLogin(!isAutoLogin);
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
      dispatch(
        notify({
          type: 'error',
          message: result.errors?.find(() => true)?.message || '',
        }),
      );
      return;
    }

    reinitialize(result.data.login, isAutoLogin);
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
        <Text style={styles.title}>Login to your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      {/* 登录form */}
      <View>
        <TextInput
          value={keyword}
          onChange={onKeywordChange}
          mode="outlined"
          label="用户名/邮箱"
          placeholder="请输入用户名/邮箱"
          theme={{
            roundness: 28,
          }}
          style={{
            marginBottom: 8,
          }}
        />

        <TextInput
          value={password}
          onChange={onPasswordChange}
          mode="outlined"
          label="密码"
          placeholder="请输入密码"
          secureTextEntry
          theme={{
            roundness: 28,
          }}
          style={{
            marginBottom: 8,
          }}
        />

        <View
          style={{
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Checkbox
            status={isAutoLogin ? 'checked' : 'unchecked'}
            onPress={onIsAutoLoginChange}
            color={theme.colors.primary}
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
            marginBottom: 64,
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
