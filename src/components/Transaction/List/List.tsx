import {useLazyQuery} from '@apollo/client';
import {StackActions, useIsFocused} from '@react-navigation/native';
import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Props, limit} from '.';
import {TRANSACTIONS} from '../../../apis/transaction';
import {Direction} from '../../../assets/transaction';
import {Transaction} from '../../../typings/transaction';
import {useNavigation} from '../../../utils/navigation';
import TransactionCard from '../Card';

const List = (props: Props) => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [transactions, setTransactions] = useState<Transaction[]>();
  const [page, setPage] = useState(1);
  const [directions, setDirections] = useState<Direction[]>([
    Direction.In,
    Direction.Out,
  ]);

  const billingId = useMemo(() => props.billingId, [props.billingId]);

  /**
   * 获取当前账本下的交易明细
   */
  const [fetchTransactions, {fetchMore}] = useLazyQuery(TRANSACTIONS, {
    variables: {
      filterInput: {
        billingId,
        directions,
        from: props.timeRange?.at(0),
        to: props.timeRange?.at(1),
      },
      paginateInput: {
        page: 1,
        limit,
      },
    },
    fetchPolicy: 'no-cache',
  });

  /**
   * 页面呈现时请求数据
   */
  useEffect(() => {
    if (!isFocused) {
      return;
    }

    fetchTransactions()
      .catch(() => null)
      .then(res => setTransactions(res?.data?.transactions.items));

    setPage(1);
  }, [isFocused, fetchTransactions, directions]);

  /**
   * 渲染交易
   */
  const renderTransaction = ({
    item,
    index,
  }: {
    item: Transaction;
    index: number;
  }) => {
    const onGo2Detail = () => {
      navigation.dispatch(
        StackActions.replace('transaction', {
          id: item.id,
          billingId,
        }),
      );
    };

    const length = transactions?.length ?? 0;

    return (
      <TransactionCard
        onPress={onGo2Detail}
        transaction={item}
        style={{marginBottom: length - 1 === index ? 0 : 16}}
      />
    );
  };

  /**
   * 渲染更多
   */
  const onFetchMore = async () => {
    const nextPage = page + 1;

    // 尝试获取下一页
    const res = await fetchMore({
      variables: {
        paginateInput: {
          page: nextPage,
          limit,
        },
      },
    });

    // 下一页没有数据，不做任何处理
    if (!res.data.transactions.items?.length) {
      return;
    }

    // 获取数据成功
    setPage(nextPage);
    setTransactions(existedTransactions =>
      (existedTransactions || []).concat(res.data.transactions.items || []),
    );
  };

  /**
   * 交易方向的触发事件
   */
  const onDirectionToggle = (value: Direction) => async () => {
    const isInclude = directions.includes(value as Direction);

    if (isInclude) {
      setDirections(directions.filter(direction => direction !== value));
    } else {
      setDirections([...directions, value as Direction]);
    }
  };

  /**
   * 头部组件
   */
  const ListHeaderComponent = useMemo(() => {
    return (
      <>
        {props.ListHeaderComponent}
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Button
            icon="battery-plus-outline"
            mode={directions.includes(Direction.In) ? 'contained' : 'outlined'}
            style={styles.direction}
            contentStyle={styles.directionContent}
            onPress={onDirectionToggle(Direction.In)}>
            收入
          </Button>

          <Button
            icon="battery-minus-outline"
            style={styles.direction}
            contentStyle={styles.directionContent}
            mode={directions.includes(Direction.Out) ? 'contained' : 'outlined'}
            onPress={onDirectionToggle(Direction.Out)}>
            支出
          </Button>
        </View>
      </>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [directions, props.ListHeaderComponent]);

  return (
    <FlatList
      contentContainerStyle={{
        padding: props.padding || 0,
      }}
      ListHeaderComponent={ListHeaderComponent}
      data={transactions}
      renderItem={renderTransaction}
      showsVerticalScrollIndicator={false}
      onEndReached={onFetchMore}
    />
  );
};

export default List;

const styles = StyleSheet.create({
  direction: {
    flex: 1,
    borderRadius: 99,
    marginBottom: 16,
    marginHorizontal: 8,
    borderWidth: 2,
    borderColor: '#007AFF',
  },

  directionContent: {
    height: 40,
  },
});
