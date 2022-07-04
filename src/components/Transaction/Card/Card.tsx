import {View} from 'react-native';
import React, {useMemo} from 'react';
import {Card as PaperCard, Text} from 'react-native-paper';
import {Props} from '.';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import dayjs from 'dayjs';
import Avatar from '../../Avatar';
import {Colors} from 'react-native-paper';
import {Direction} from '../../../assets/transaction';

const Card = (props: Props) => {
  /**
   * 交易
   */
  const transaction = useMemo(() => props.transaction, [props.transaction]);

  /**
   * 交易创建时间
   */
  const createdAt = useMemo(
    () => dayjs(props.transaction.createdAt),
    [props.transaction.createdAt],
  );

  /**
   * 交易方向
   */
  const isExpense = useMemo(
    () => props.transaction.direction === Direction.Out,
    [props.transaction.direction],
  );

  return (
    <PaperCard
      style={[
        {
          borderRadius: 16,
        },
        props.style,
      ]}
      onPress={props.onPress}>
      <PaperCard.Content
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {/* 用户头像 */}
        <Avatar />

        <View
          style={{
            marginLeft: 12,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
            }}>
            <Text>{transaction.createdBy.username}</Text>

            {/* 交易金额 */}
            <Text
              style={{
                marginLeft: 'auto',
                color: isExpense ? Colors.red300 : Colors.green300,
              }}>
              {`¥ ${transaction.amount}`}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
              }}>
              {createdAt.format('MM-DD')}
            </Text>

            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                marginHorizontal: 16,
                fontSize: 12,
                color: Colors.grey700,
              }}>
              {transaction.remark}
            </Text>

            {/* 分类按钮 */}
            <MaterialCommunityIcons
              name={transaction.category.icon}
              size={16}
              style={{
                marginLeft: 'auto',
              }}
            />
          </View>
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
};

export default Card;
