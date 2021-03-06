import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Home from '../pages/Home';
import Setting from '../pages/Setting/Setting';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Overview from '../pages/Overview';

const Tab = createMaterialBottomTabNavigator();

const Layout = () => {
  const OverviewWrapper = () => <Overview />;

  return (
    <Tab.Navigator initialRouteName={Home.name} labeled={false}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="overview"
        component={OverviewWrapper}
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="chart-box" color={color} size={24} />
          ),
        }}
      />

      <Tab.Screen
        name="setting"
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
