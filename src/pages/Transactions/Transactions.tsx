import {useQuery} from '@apollo/client';
import React from 'react';
import {FlatList, SafeAreaView, View} from 'react-native';
import {TRANSACTIONS} from '../../apis/transaction';
import {TransactionsProp} from '../../typings/navigation';
import {useRoute} from '../../utils/navigation';

const Transactions = () => {
  const {
    params: {billingId},
  } = useRoute<TransactionsProp>();

  /**
   * 获取当前账本下的交易明细
   */
  const {data: transactions} = useQuery(TRANSACTIONS, {
    variables: {
      billingId,
    },
  });

  /**
   * 渲染交易
   */
  const renderTransaction = () => {
    return <View />;
  };

  return (
    <SafeAreaView>
      <FlatList
        data={transactions?.transactions}
        renderItem={renderTransaction}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Transactions;
