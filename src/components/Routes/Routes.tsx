import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {NavigationContainer} from '@react-navigation/native';
import Layout from '../../layouts/Layout';
import Billings from '../../pages/Billings';
import Billing from '../../pages/Billing';
import Transaction from '../../pages/Transaction';
import Transactions from '../../pages/Transactions';
import Users from '../../pages/Users';
import {combinedDefaultTheme} from '.';
import Login from '../../pages/Account/Login';
import Register from '../../pages/Account/Register';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const isInitialized = useSelector<State, boolean>(
    state => state.app.isInitialized,
  );

  const isLoggedIn = useSelector<State, boolean>(
    state => state.userProfile.isLoggedIn,
  );

  // 应用未初始化，返回骨架屏
  if (!isInitialized) {
    return null;
  }

  return (
    <NavigationContainer theme={combinedDefaultTheme}>
      <Stack.Navigator
        screenOptions={() => ({
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        })}
        initialRouteName="layout">
        <Stack.Screen
          name="layout"
          component={Layout}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="billings"
          component={Billings}
          options={{
            title: '我的账本',
          }}
        />

        <Stack.Screen
          name="billing"
          component={Billing}
          options={{
            title: '账本',
          }}
        />

        <Stack.Screen
          name="transaction"
          component={Transaction}
          options={{
            title: '交易',
          }}
        />

        <Stack.Screen
          name="transactions"
          component={Transactions}
          options={{
            title: '交易明细',
          }}
        />

        <Stack.Screen
          name="users"
          component={Users}
          options={{
            title: '用户列表',
          }}
        />

        {/* 鉴权路由 */}
        {!isLoggedIn && (
          <Stack.Group>
            <Stack.Screen
              name="login"
              component={Login}
              options={{
                title: '登录',
              }}
            />

            <Stack.Screen
              name="register"
              component={Register}
              options={{
                title: '注册',
              }}
            />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
