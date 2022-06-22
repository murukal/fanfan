import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Login from '../pages/Account/Login';
import Register from '../pages/Account/Register';
import {State} from '../redux';
import {useNavigation} from '../utils/navigation';
import {IconButton, useTheme} from 'react-native-paper';

const Stack = createNativeStackNavigator();

const Account = () => {
  const isLogin = useSelector<State, boolean>(
    state => state.userProfile.isLogin,
  );
  const navigation = useNavigation();
  const theme = useTheme();

  useEffect(() => {
    isLogin && navigation.navigate('Layout');
  }, [navigation, isLogin]);

  /**
   * 退出账户界面
   */
  const onExit = () => {
    navigation.goBack();
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: () => (
          <IconButton
            icon="chevron-left"
            color={theme.colors.primary}
            onPress={onExit}
          />
        ),
      }}>
      <Stack.Screen
        name={Login.name}
        component={Login}
        options={{
          headerTitle: '登录',
        }}
      />
      <Stack.Screen
        name={Register.name}
        component={Register}
        options={{
          headerTitle: '注册',
        }}
      />
    </Stack.Navigator>
  );
};

export default Account;
