import {useMutation} from '@apollo/client';
import React, {useEffect, useMemo, useState} from 'react';
import {
  Linking,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInputChangeEventData,
  View,
  TextInput as NativeTextInput,
} from 'react-native';
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {REGISTER, SEND_CAPTCHA} from '../../apis/auth';
import {Notify, reinitialize} from '../../utils';
import {useNavigation} from '../../utils/navigation';

const Register = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const [emailAddress, setEmailAddress] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [captcha, setCaptcha] = useState<string>();
  const [isPasswordVisiable, setIsPasswordVisiable] = useState(false);
  const [count, setCount] = useState(60);
  const [isTiming, setIsTiming] = useState(false);
  const [register] = useMutation(REGISTER, {
    context: {
      appId: 'boomemory',
    },
  });
  const [sendCaptcha] = useMutation(SEND_CAPTCHA, {
    context: {
      appId: 'boomemory',
    },
  });

  /**
   * 执行倒计时
   */
  useEffect(() => {
    if (!isTiming) {
      return;
    }

    const interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount <= 1) {
          clearInterval(interval);
          return 60;
        } else {
          return prevCount - 1;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTiming]);

  /**
   * 前往登录
   */
  const onGo2Login = () => {
    navigation.navigate('login');
  };

  /**
   * 登录
   */
  const onRegister = async () => {
    const res = await register({
      variables: {
        registerInput: {
          emailAddress: emailAddress || '',
          captcha: captcha || '',
          password: password || '',
        },
      },
    }).catch((error: Error) => {
      Notify.error({
        title: error.message,
      });
      return null;
    });

    reinitialize(res?.data?.register, true);
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
   * 输入验证码
   */
  const onCaptchaChange = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    setCaptcha(e.nativeEvent.text);
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
   * 验证码校验
   */
  const captchaError = useMemo(() => {
    if (captcha === undefined) {
      return;
    }

    if (!captcha) {
      return '请输入验证码';
    }
  }, [captcha]);

  /**
   * 密码校验
   */
  const passwordError = useMemo(() => {
    if (password === undefined) {
      return;
    }

    if (!password) {
      return '请输入密码';
    }
  }, [password]);

  /**
   * 发送验证
   */
  const onSendCaptcha = async () => {
    const res = await sendCaptcha({
      variables: {
        emailAddress: emailAddress || '',
      },
    }).catch((error: Error) => {
      Notify.error({
        title: error.message,
      });
      return null;
    });

    if (!res?.data?.sendCaptcha) {
      return;
    }

    setIsTiming(true);
  };

  /**
   * 发送验证码触发器
   */
  const CaptchaTrigger = useMemo(() => {
    if (!isTiming) {
      return (
        <Button
          disabled={!emailAddress || !!emailAddressError}
          onPress={onSendCaptcha}>
          发送验证码
        </Button>
      );
    }

    return <Text>{`${count} 秒后重新获取`}</Text>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTiming, count, emailAddress, emailAddressError]);

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
          render={props => {
            const {style, ...otherProps} = props;

            return (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <NativeTextInput
                  {...otherProps}
                  style={[
                    ...style,
                    {
                      flex: 1,
                    },
                  ]}
                />
                <View
                  style={{
                    paddingRight: 8,
                  }}>
                  {CaptchaTrigger}
                </View>
              </View>
            );
          }}
        />

        <HelperText type="error" visible={!!emailAddressError} padding="none">
          {emailAddressError}
        </HelperText>

        <TextInput
          mode="outlined"
          value={captcha}
          placeholder="验证码"
          onChange={onCaptchaChange}
          autoCapitalize="none"
          error={!!captchaError}
        />

        <HelperText type="error" visible={!!captchaError} padding="none">
          {captchaError}
        </HelperText>

        <TextInput
          mode="outlined"
          value={password}
          placeholder="密码"
          onChange={onPasswordChange}
          autoCapitalize="none"
          error={!!passwordError}
          secureTextEntry={!isPasswordVisiable}
          right={
            <TextInput.Icon
              onPress={() => {
                setIsPasswordVisiable(prev => !prev);
              }}
              name={isPasswordVisiable ? 'eye' : 'eye-off'}
            />
          }
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
            borderRadius: 99,
          }}>
          注 册
        </Button>
      </View>

      {/* 跳转 */}
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <Text>已有账号？前往 </Text>

        <Text
          onPress={onGo2Login}
          style={{
            color: theme.colors.primary,
          }}>
          登陆
        </Text>

        <Text> 查看 </Text>

        <Text
          onPress={onViewPrivacy}
          style={{
            color: theme.colors.primary,
          }}>
          隐私政策
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
