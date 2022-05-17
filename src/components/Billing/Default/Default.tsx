import React from 'react';
import {ImageBackground, StyleSheet} from 'react-native';
import {Text, Caption} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {State} from '../../../redux';
import {Billing} from '../../../typings/billing';

const Default = () => {
  const billing = useSelector<State, Billing | undefined>(
    state => state.userProfile.user?.moneyProfile.defaultBilling,
  );

  return (
    <ImageBackground
      source={{
        uri: 'https://picsum.photos/700',
      }}
      style={{
        marginBottom: 16,
        padding: 32,
      }}
      imageStyle={{
        borderRadius: 24,
      }}>
      <Text
        style={{
          ...styles.white,
          marginBottom: 16,
          fontSize: 24,
          fontWeight: '500',
        }}>
        {billing?.name}
      </Text>

      <Caption
        style={{
          ...styles.white,
        }}>
        最近一个月的收支
      </Caption>

      <Text
        style={{
          ...styles.white,
          fontSize: 44,
          fontWeight: '600',
        }}>
        $1,237
      </Text>
    </ImageBackground>
  );
};

export default Default;

const styles = StyleSheet.create({
  white: {
    color: 'white',
  },
});
