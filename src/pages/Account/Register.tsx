import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {NavigationMetadata} from '../../typings/navigation';
import {register} from '../../apis/auth';
import {reinitialize} from '../../utils';

const Register = () => {
  const navigation = useNavigation<NavigationMetadata>();
  const theme = useTheme();
  const [error, setError] = useState<string>('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  /**
   * 前往登录
   */
  const onGo2Login = () => {
    navigation.navigate('Account', {
      screen: 'Login',
    });
  };

  /**
   * 登录
   */
  const onRegister = async () => {
    const result = await register({
      username,
      email,
      password,
    });

    if (!result.data) {
      setError(result.errors?.find(() => true)?.message || '');
      return;
    }

    reinitialize(result.data.register, true);
  };

  /**
   * 变更
   */
  const onUsernameChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setError('');
    setUsername(e.nativeEvent.text);
  };

  const onEmailChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    setError('');
    setEmail(e.nativeEvent.text);
  };

  const onPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setError('');
    setPassword(e.nativeEvent.text);
  };
  const onRepeatPasswordChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setError('');
    setRepeatPassword(e.nativeEvent.text);
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

      <View>
        <TextInput
          // autoFocus={true}
          value={username}
          mode="outlined"
          label="用户名"
          placeholder="请输入用户名"
          onChange={onUsernameChange}
          error={!!error}
          theme={{
            roundness: 28,
          }}
        />

        <HelperText type="error" visible={!!error} padding="none">
          {error}
        </HelperText>

        <TextInput
          mode="outlined"
          value={email}
          label="邮箱"
          placeholder="请输入邮箱"
          onChange={onEmailChange}
          error={!!error}
          theme={{
            roundness: 28,
          }}
        />

        <HelperText type="error" visible={!!error} padding="none">
          {error}
        </HelperText>

        <TextInput
          mode="outlined"
          value={password}
          label="密码"
          placeholder="请输入密码"
          onChange={onPasswordChange}
          error={!!error}
          secureTextEntry
          theme={{
            roundness: 28,
          }}
        />

        <HelperText type="error" visible={!!error} padding="none">
          {error}
        </HelperText>

        <TextInput
          mode="outlined"
          value={repeatPassword}
          label="二次确认密码"
          placeholder="请输入二次确认密码"
          onChange={onRepeatPasswordChange}
          error={!!error}
          secureTextEntry
          theme={{
            roundness: 28,
          }}
        />

        <HelperText type="error" visible={!!error} padding="none">
          {error}
        </HelperText>

        <Button
          mode="contained"
          onPress={onRegister}
          contentStyle={{
            height: 56,
          }}
          style={{
            borderRadius: 9999,
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
