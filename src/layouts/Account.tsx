import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import Login from '../pages/Account/Login';
import Register from '../pages/Account/Register';
import {State} from '../redux';
import {NavigationMetadata} from '../typings/navigation';

const Stack = createNativeStackNavigator();

const Account = () => {
  const isLogin = useSelector<State, boolean>(
    state => state.userProfile.isLogin,
  );
  const navigation = useNavigation<NavigationMetadata>();

  useEffect(() => {
    isLogin && navigation.navigate('Layout');
  }, [navigation, isLogin]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Login.name} component={Login} />
      <Stack.Screen name={Register.name} component={Register} />
    </Stack.Navigator>
  );
};

export default Account;
