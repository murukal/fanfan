import {useQuery} from '@apollo/client';
import React, {useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Button, Card, FAB, Text, Title} from 'react-native-paper';
import {TRANSACTIONS} from '../../apis/transaction';
import {Direction} from '../../assets/transaction';
import {TransactionsProp} from '../../typings/navigation';
import {Transaction} from '../../typings/transaction';
import {useNavigation, useRoute} from '../../utils/navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';

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

  const [transactions, setTransactions] = useState<Transaction[]>();

  /**
   * 获取当前账本下的交易明细
   */
  const {fetchMore} = useQuery(TRANSACTIONS, {
    variables: {
      filterInput: {
        billingId,
        directions,
      },
      paginateInput: {
        page,
        limit,
      },
    },

    onCompleted: data => {
      setTransactions(data.transactions.items);
    },
  });

  /**
   * 渲染交易
   */
  const renderTransaction = ({item}: {item: Transaction}) => {
    const date = dayjs(item.createdAt);

    return (
      <Card
        style={{
          marginHorizontal: 4,
          marginBottom: 16,
          borderRadius: 16,
        }}>
        <Card.Content
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* 分类按钮 */}
          <MaterialCommunityIcons
            name={item.category.icon}
            size={48}
            style={{
              marginRight: 24,
            }}
          />

          {/* 交易时间 */}
          <View>
            <Title>{date.format('YYYY-MM-DD')}</Title>
            <Text>{date.format('HH:mm:ss')}</Text>
          </View>

          {/* 交易金额 */}
          <View
            style={{
              marginLeft: 'auto',
            }}>
            <Title>{item.amount}</Title>
          </View>
        </Card.Content>
      </Card>
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
          limit,
        },
      },
    });

    if (!result.data || !result.data.transactions.items?.length) {
      return;
    }

    // 获取数据成功
    setPage(nextPage);
    setTransactions(existedTransactions =>
      (existedTransactions || []).concat(result.data.transactions.items || []),
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

    setPage(1);
  };

  /**
   * 创建交易
   */
  const onCreate = () => {
    navigation.navigate('transaction', {
      billingId,
    });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <FlatList
        style={{
          padding: 16,
        }}
        ListHeaderComponent={() => (
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Button
              icon="battery-plus-outline"
              mode={
                directions.includes(Direction.In) ? 'contained' : 'outlined'
              }
              style={styles.direction}
              contentStyle={styles.directionContent}
              onPress={onDirectionToggle(Direction.In)}>
              收入
            </Button>

            <Button
              icon="battery-minus-outline"
              style={styles.direction}
              contentStyle={styles.directionContent}
              mode={
                directions.includes(Direction.Out) ? 'contained' : 'outlined'
              }
              onPress={onDirectionToggle(Direction.Out)}>
              支出
            </Button>
          </View>
        )}
        data={transactions}
        renderItem={renderTransaction}
        showsVerticalScrollIndicator={false}
        onEndReached={onFetchMore}
      />

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

const styles = StyleSheet.create({
  direction: {
    flex: 1,
    borderRadius: 24,
    marginBottom: 16,
    marginHorizontal: 8,
  },

  directionContent: {
    height: 48,
  },
});
