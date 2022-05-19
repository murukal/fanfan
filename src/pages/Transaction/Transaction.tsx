import {TextInput} from 'react-native-paper';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Picker from '../../components/Picker';

const Transaction = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
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

      <Picker>
        <TextInput />
      </Picker>
    </SafeAreaView>
  );
};

export default Transaction;
