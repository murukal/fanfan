import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Colors, FAB, Text, ToggleButton} from 'react-native-paper';
import {TRANSACTIONS} from '../../apis/transaction';
import {Direction} from '../../assets/transaction';
import {TransactionsProp} from '../../typings/navigation';
import {Transaction} from '../../typings/transaction';
import {useNavigation, useRoute} from '../../utils/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  const navigation = useNavigation();

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
    const color =
      item.direction === Direction.In ? Colors.blue300 : Colors.red300;

    console.log('color====', color);

    return (
      <View
        style={{
          marginHorizontal: 16,
          marginBottom: 16,
          flexDirection: 'row',
        }}>
        {/* 分类按钮 */}
        <MaterialCommunityIcons name={item.category.icon} />

        {/* 详细信息 */}
        <View>
          <Text>{item.id}</Text>
        </View>
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

  /**
   * 创建交易
   */
  const onCreate = () => {
    navigation.navigate('Transaction', {
      billingId,
    });
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

      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        small
        icon="plus"
        onPress={onCreate}
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
