import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Text, ToggleButton} from 'react-native-paper';
import {TRANSACTIONS} from '../../apis/transaction';
import {Direction} from '../../assets/transaction';
import {TransactionsProp} from '../../typings/navigation';
import {Transaction} from '../../typings/transaction';
import {useRoute} from '../../utils/navigation';

const limit = 20;

const Transactions = () => {
  const {
    params: {billingId},
  } = useRoute<TransactionsProp>();
  const [page, setPage] = useState(1);
  const [directions, setDirections] = useState<Direction[]>([
    Direction.In,
    Direction.Out,
  ]);

  /**
   * 获取当前账本下的交易明细
   */
  const {
    data: transactions,
    fetchMore,
    refetch,
  } = useQuery(TRANSACTIONS, {
    variables: {
      filterInput: {
        billingId,
        directions: directions,
      },
      paginateInput: {
        page,
        limit,
      },
    },
  });

  /**
   * 渲染交易
   */
  const renderTransaction = ({item}: {item: Transaction}) => {
    return (
      <View>
        <Text>{item.id}</Text>
      </View>
    );
  };

  /**
   * 渲染更多
   */
  const onFetchMore = async () => {
    const nextPage = page + 1;

    const result = await fetchMore({
      variables: {
        paginateInput: {
          page: nextPage,
        },
      },
    });

    if (!result.data) {
      return;
    }
    // 获取数据成功，更新page
    setPage(nextPage);
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

    // 重新请求数据
    setPage(1);
    await refetch();
  };

  return (
    <SafeAreaView>
      <FlatList
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: 'row',
              marginTop: 16,
            }}>
            <ToggleButton
              style={[
                styles.direction,
                {
                  marginLeft: 16,
                  marginRight: 8,
                },
              ]}
              icon="battery-plus-outline"
              status={
                directions.includes(Direction.In) ? 'checked' : 'unchecked'
              }
              onPress={onDirectionToggle(Direction.In)}
            />

            <ToggleButton
              style={[
                styles.direction,
                {
                  marginRight: 16,
                  marginLeft: 8,
                },
              ]}
              icon="battery-minus-outline"
              status={
                directions.includes(Direction.Out) ? 'checked' : 'unchecked'
              }
              onPress={onDirectionToggle(Direction.Out)}
            />
          </View>
        )}
        data={transactions?.transactions.items}
        renderItem={renderTransaction}
        showsVerticalScrollIndicator={false}
        onEndReached={onFetchMore}
      />
    </SafeAreaView>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  direction: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 16,
  },
});
