import React from 'react';
import {SafeAreaView} from 'react-native';
import {useRoute} from '../../utils/navigation';

const Transactions = () => {
  const {params} = useRoute();

  console.log(params);

  return <SafeAreaView>{/* <FlatList></FlatList> */}</SafeAreaView>;
};

export default Transactions;
