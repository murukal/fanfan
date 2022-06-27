import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {NavigationContainer} from '@react-navigation/native';
import Layout from '../../layouts/Layout';
import Account from '../../layouts/Account';
import Billings from '../../pages/Billings';
// import Billing from '../../pages/Billing';
// import Transaction from '../../pages/Transaction';
// import Transactions from '../../pages/Transactions';
// import Users from '../../pages/Users';
import {combinedDefaultTheme} from '.';

const Stack = createNativeStackNavigator();

const Routes = () => {
  const isInitialized = useSelector<State, boolean>(
    state => state.app.isInitialized,
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
        initialRouteName={Layout.name}>
        <Stack.Screen
          name={Layout.name}
          component={Layout}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={Account.name}
          component={Account}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name={Billings.name}
          component={Billings}
          options={{
            title: '我的账本',
          }}
        />

        {/* <Stack.Screen
          name={Billing.name}
          component={Billing}
          options={{
            title: '账本',
          }}
        /> */}

        {/* <Stack.Screen
          name={Transaction.name}
          component={Transaction}
          options={{
            title: '交易',
          }}
        /> */}

        {/* <Stack.Screen
          name={Transactions.name}
          component={Transactions}
          options={{
            title: '交易明细',
          }}
        /> */}

        {/* <Stack.Screen
          name={Users.name}
          component={Users}
          options={{
            title: '用户列表',
          }}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
