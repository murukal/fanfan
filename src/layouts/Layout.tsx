import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../pages/Home';
import Setting from '../pages/Setting';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator initialRouteName={Home.name} labeled={false}>
      <Tab.Screen
        name={Home.name}
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name={Setting.name}
        component={Setting}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Layout;