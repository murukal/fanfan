import {
  ActivityIndicator,
  Button,
  Chip,
  Text,
  TextInput,
  Title,
  ToggleButton,
} from 'react-native-paper';
import React, {useEffect} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput as NativeTextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useLazyQuery, useMutation, useQuery} from '@apollo/client';
import {CATEGORIES} from '../../apis/category';
import {Category} from '../../typings/category';
import {TransactionProp} from '../../typings/navigation';
import {CREATE, TRANSACTION, UPDATE} from '../../apis/transaction';
import {Notify} from '../../utils';
import {useNavigation, useRoute} from '../../utils/navigation';
import {Direction, DirectionDescription} from '../../assets/transaction';
import {useIsFocused} from '@react-navigation/native';

const Transaction = () => {
  const [direction, setDirection] = useState<Direction>(Direction.Out);
  const [categoryId, setCategoryId] = useState<number>();
  const [amount, setAmount] = useState<string>();
  const [remark, setRemark] = useState<string>();

  const {
    params: {id, billingId},
  } = useRoute<TransactionProp>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [create] = useMutation(CREATE);
  const [update] = useMutation(UPDATE);
  const [getTransaction] = useLazyQuery(TRANSACTION, {
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      setAmount(data.transaction.amount.toString());
      setCategoryId(data.transaction.category.id);
      setDirection(data.transaction.direction);
      setRemark(data.transaction.remark);
    },
  });

  useEffect(() => {
    if (!isFocused) {
      return;
    }

    // 设置初始值
    if (!id) {
      setDirection(Direction.Out);
      setCategoryId(undefined);
      setAmount(undefined);
      setRemark(undefined);
      return;
    }

    // 请求交易详情
    getTransaction({
      variables: {
        id,
      },
    });
  }, [isFocused, id, getTransaction]);

  /**
   * 请求分类
   */
  const {data: categories, loading: isCategoriesLoading} = useQuery(CATEGORIES);

  /**
   * 切换交易方向
   */
  const onSwitch = () => {
    direction === Direction.In
      ? setDirection(Direction.Out)
      : setDirection(Direction.In);
  };

  /**
   * 渲染分类
   */
  const categoryRender = ({item}: {item: Category}) => {
    const isCurrent = item.id === categoryId;

    return (
      <View
        style={{
          alignItems: 'center',
          margin: 8,
        }}>
        <ToggleButton
          icon={item.icon}
          status={isCurrent ? 'checked' : 'unchecked'}
          onPress={() => {
            setCategoryId(item.id);
          }}
        />

        <Text>{item.name}</Text>
      </View>
    );
  };

  /**
   * 提交事件
   */
  const onSubmit = async () => {
    if (!categoryId || !amount || isNaN(Number(amount))) {
      Notify.error({
        title: '请填写必要信息，才可以创建交易',
      });
      return;
    }

    const handlers = {
      create: () =>
        create({
          variables: {
            createTransactionInput: {
              amount: Number(amount),
              billingId: billingId,
              categoryId,
              direction,
              remark,
            },
          },
        }),
      update: () =>
        update({
          variables: {
            id: id as number,
            updateTransactionInput: {
              amount: Number(amount),
              categoryId,
              direction,
              remark,
            },
          },
        }),
    };

    const res = await handlers[id ? 'update' : 'create']().catch(
      (error: Error) => {
        Notify.error({
          title: error.message,
        });
        return null;
      },
    );

    // 创建完成进入当前账本的交易明细页面
    res?.data &&
      navigation.navigate('transactions', {
        billingId,
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}>
        <TextInput
          style={{
            borderRadius: 16,
            marginBottom: 24,
          }}
          mode="outlined"
          placeholder="请输入交易金额"
          theme={{
            roundness: 20,
          }}
          render={props => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Chip
                  closeIcon={() => (
                    <MaterialCommunityIcons name="swap-horizontal" size={20} />
                  )}
                  onClose={onSwitch}
                  style={{
                    height: 32,
                    marginHorizontal: 12,
                  }}>
                  {DirectionDescription[direction]}
                </Chip>
                <MaterialCommunityIcons name="currency-cny" size={20} />
                <NativeTextInput
                  {...props}
                  keyboardType="numeric"
                  value={amount}
                  onChangeText={text => setAmount(text)}
                />
              </View>
            );
          }}
        />

        {/* 选择分类 */}
        <View
          style={{
            marginBottom: 24,
          }}>
          <Title style={[styles.title]}>选择分类</Title>

          {isCategoriesLoading ? (
            <ActivityIndicator
              animating={true}
              style={{
                marginTop: 24,
              }}
            />
          ) : (
            <FlatList
              horizontal
              data={categories?.categories.items}
              renderItem={categoryRender}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* 备注 */}
        <View
          style={{
            marginBottom: 24,
          }}>
          <Title
            style={[
              styles.title,
              {
                marginBottom: 16,
              },
            ]}>
            备注
          </Title>
          <TextInput
            style={{
              padding: 4,
            }}
            multiline
            numberOfLines={4}
            autoCapitalize="none"
            render={props => {
              return (
                <NativeTextInput
                  {...props}
                  value={remark}
                  onChangeText={text => setRemark(text)}
                />
              );
            }}
          />
        </View>

        <View
          style={{
            marginTop: 'auto',
          }}>
          <Button
            icon="cash-register"
            mode="contained"
            onPress={onSubmit}
            contentStyle={{
              height: 48,
            }}
            style={{
              borderRadius: 12,
            }}>
            {id ? '更新' : '创建'}交易
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
});
