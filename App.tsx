/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Layout from './src/layouts/Layout';
import Account from './src/layouts/Account';
import {useEffect} from 'react';
import {initialize} from './src/utils';
import {ApolloProvider} from '@apollo/client';
import client from './src/apis';
import {Provider, useSelector} from 'react-redux';
import {State, store} from './src/redux';

import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';

import {
  DefaultTheme as PaperDefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import merge from 'deepmerge';
import Billing from './src/pages/Billing';
import Billings from './src/pages/Billings';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

MaterialCommunityIcons.loadFont();

/**
 * 设置主题
 */
const CombinedDefaultTheme = merge(
  merge(PaperDefaultTheme, NavigationDefaultTheme),
  {
    colors: {
      background: 'white',
    },
  },
);

const Stack = createNativeStackNavigator();

const Routes = () => {
  const isInitialized = useSelector<State, boolean>(
    state => state.app.isInitialized,
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <NavigationContainer theme={CombinedDefaultTheme}>
      <Stack.Navigator
        screenOptions={() => ({
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
        initialRouteName={Layout.name}>
        <Stack.Screen
          name={Layout.name}
          component={Layout}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name={Account.name} component={Account} />

        <Stack.Screen
          name={Billings.name}
          component={Billings}
          options={{
            title: '我的账本',
          }}
        />

        <Stack.Screen
          name={Billing.name}
          component={Billing}
          options={{
            title: '账本',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  /**
   * 初始化app
   */
  useEffect(() => {
    initialize();
  }, []);

  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <PaperProvider theme={CombinedDefaultTheme}>
          <Routes />
        </PaperProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
