import {SafeAreaView, ScrollView} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import Signed from './Signed';
import Unsign from './Unsign';

const Setting = () => {
  const isLoggedIn = useSelector<State, Boolean>(
    state => state.userProfile.isLoggedIn,
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 16,
        }}>
        {isLoggedIn ? <Signed /> : <Unsign />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Setting;
