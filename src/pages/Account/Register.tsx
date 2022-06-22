import React, {useMemo, useState} from 'react';
import {
  Linking,
  NativeSyntheticEvent,
  ScrollView,
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
import {register} from '../../apis/auth';
import {reinitialize} from '../../utils';
import {useNavigation} from '../../utils/navigation';

const Register = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [password, setPassword] = useState<string>();

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
      username: '',
      emailAddress: emailAddress || '',
      password: password || '',
    });

    if (!result.data) {
      return;
    }

    reinitialize(result.data.register, true);
  };

  /**
   * 邮箱地址发生变更
   */
  const onEmailAddressChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setEmailAddress(e.nativeEvent.text);
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
   * 查询隐私政策
   */
  const onViewPrivacy = () => {
    Linking.openURL('https://fantufantu.com/privacy');
  };

  /**
   * 邮箱地址校验
   */
  const emailAddressError = useMemo(() => {
    if (emailAddress === undefined) {
      return;
    }

    if (!emailAddress) {
      return '请输入邮箱地址';
    }
  }, [emailAddress]);

  /**
   * 密码校验
   */
  const passwordError = useMemo(() => {
    return password;
  }, [password]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 32,
      }}
      showsVerticalScrollIndicator={false}>
      {/* 标题 */}
      <View
        style={{
          marginBottom: 32,
        }}>
        <Text style={styles.title}>Create your</Text>
        <Text style={styles.title}>Account</Text>
      </View>

      <View
        style={{
          marginBottom: 32,
        }}>
        <TextInput
          mode="outlined"
          value={emailAddress}
          placeholder="邮箱地址"
          onChange={onEmailAddressChange}
          autoCapitalize="none"
          error={!!emailAddressError}
        />

        <HelperText type="error" visible={!!emailAddressError} padding="none">
          {emailAddressError}
        </HelperText>

        <TextInput
          mode="outlined"
          value={password}
          placeholder="密码"
          onChange={onPasswordChange}
          autoCapitalize="none"
          error={!!passwordError}
          secureTextEntry
        />

        <HelperText type="error" visible={!!passwordError} padding="none">
          {passwordError}
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
            登陆{' '}
          </Text>
          查看{' '}
          <Text
            onPress={onViewPrivacy}
            style={{
              color: theme.colors.primary,
            }}>
            隐私政策
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default Register;
