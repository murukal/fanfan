import {Title, Card as PaperCard, Caption} from 'react-native-paper';
import React, {useMemo} from 'react';
import {Props} from '.';
import {View} from 'react-native';
import dayjs from 'dayjs';
import Avatars from '../../Avatars';
import {useNavigation} from '../../../utils/navigation';

const Card = (props: Props) => {
  const navigation = useNavigation();

  const billing = useMemo(() => props.billing, [props.billing]);

  /**
   * 账本创建时间
   */
  const createdAt = useMemo(() => {
    const date = dayjs(billing.createdAt);
    return date.format('YYYY-MM-DD HH:mm:ss');
  }, [billing.createdAt]);

  /**
   * 账本分享信息
   */
  const shares = useMemo(() => billing.shares || [], [billing.shares]);

  /**
   * 规格
   */
  const size = useMemo(() => {
    if (props.size === 'small') {
      return props.size;
    }

    if (!shares.length) {
      return 'small';
    }

    return props.size || 'large';
  }, [props.size, shares]);

  /**
   * 查看账单明细
   */
  const onGo2Billing = () => {
    navigation.navigate('billing', {
      id: billing.id,
    });
  };

  return (
    <PaperCard
      style={[
        props.style,
        {
          borderRadius: 24,
        },
      ]}
      elevation={5}
      onPress={onGo2Billing}>
      <PaperCard.Content>
        <View
          style={{
            justifyContent: 'space-between',
          }}>
          <Title>{billing.name}</Title>
          <Caption>created at: {createdAt}</Caption>
          <Caption>created by: {billing.createdBy.username}</Caption>

          {size === 'large' && (
            <Avatars users={shares.map(share => share.sharedBy)} />
          )}
        </View>
      </PaperCard.Content>
    </PaperCard>
  );
};

export default Card;
