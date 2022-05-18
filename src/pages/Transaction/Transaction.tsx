import {TextInput} from 'react-native-paper';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

const Transaction = () => {
  return (
    <SafeAreaView>
      <ScrollView
        style={{
          padding: 20,
        }}>
        <TextInput
          style={{
            borderRadius: 16,
          }}
          mode="outlined"
          textContentType="password"
          label="密码"
          placeholder="请输入密码"
          theme={{
            roundness: 20,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;
