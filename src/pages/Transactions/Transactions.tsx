import React from 'react';
import {SafeAreaView} from 'react-native';
import {FAB} from 'react-native-paper';
import {TransactionsProp} from '../../typings/navigation';
import {useNavigation, useRoute} from '../../utils/navigation';
import TransactionsList from '../../components/Transaction/List';
import {StackActions} from '@react-navigation/native';

const Transactions = () => {
  const {
    params: {billingId},
  } = useRoute<TransactionsProp>();

  const navigation = useNavigation();

  /**
   * 创建交易
   */
  const onCreate = () => {
    navigation.dispatch(
      StackActions.replace('transaction', {
        billingId,
      }),
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <TransactionsList billingId={billingId} padding={16} />

      <FAB
        style={{
          position: 'absolute',
          right: 36,
          bottom: 60,
        }}
        small
        icon="plus"
        onPress={onCreate}
      />
    </SafeAreaView>
  );
};

export default Transactions;
