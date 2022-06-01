import {StyleSheet, View} from 'react-native';
import {Props} from '.';
import React from 'react';

const Divider = (props: Props) => {
  if (!props.children) {
    return (
      <View
        style={[
          styles.divider,
          {
            width: '100%',
          },
          props.style,
        ]}
      />
    );
  }

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
        props.style,
      ]}>
      <View style={[styles.divider, styles.fill]} />
      <View
        style={{
          marginHorizontal: 16,
        }}>
        {props.children}
      </View>
      <View style={[styles.divider, styles.fill]} />
    </View>
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
  },

  fill: {
    flex: 1,
  },
});

export default Divider;
