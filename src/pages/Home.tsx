import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import Services from '../components/Services';
import BillingDefault from '../../src/components/Billing/Default';
import Welcome from '../components/Welcome/Welcome';

const Home = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 20,
        }}>
        {/* 欢迎 */}
        <Welcome />

        {/* 默认账本 */}
        <BillingDefault />

        {/* 功能区 */}
        <Services />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
