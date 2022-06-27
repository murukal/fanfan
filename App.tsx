/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ApolloProvider} from '@apollo/client';
import client from './src/apis';
import {Provider as StoreProvider} from 'react-redux';
import {initialize} from './src/utils';
import {store} from './src/redux';
import {Provider as PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Routes, {combinedDefaultTheme} from './src/components/Routes';

MaterialCommunityIcons.loadFont();

const App = () => {
  /**
   * 初始化app
   */
  useEffect(() => {
    initialize();
  }, []);

  return (
    <ApolloProvider client={client}>
      <StoreProvider store={store}>
        <PaperProvider theme={combinedDefaultTheme}>
          <Routes />
        </PaperProvider>
      </StoreProvider>
    </ApolloProvider>
  );
};

export default App;
