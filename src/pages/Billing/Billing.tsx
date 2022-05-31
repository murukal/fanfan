import {useQuery} from '@apollo/client';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Divider, useTheme} from 'react-native-paper';
import {Props} from '.';
import {BILLING, remove} from '../../apis/billing';
import {TargetType} from '../../apis/share';
import {BillingCard} from '../../components/Billing';
import {BillingProp} from '../../typings/navigation';
import {errorsNotify} from '../../utils';
import {useNavigation, useRoute} from '../../utils/navigation';

const Billing = (props: Props) => {
  const theme = useTheme();
  const navigation = useNavigation();
  const {params} = useRoute<BillingProp>();

  // 账本id
  const id = useMemo(
    () => (params?.id || props.id) as number,
    [params?.id, props.id],
  );

  const {data: billing} = useQuery(BILLING, {
    variables: {
      id,
    },
  });

  /**
   * 查看交易明细
   */
  const onGo2Transactions = () => {
    navigation.navigate('Transactions', {
      billingId: id,
    });
  };

  /**
   * 分享账单
   */
  const onShare = () => {
    navigation.navigate('Users', {
      fromType: TargetType.Billing,
      fromId: id,
      checkedIds: billing?.billing.shares?.map(share => share.sharedById) || [],
    });
  };

  /**
   * 删除账本
   */
  const onDelete = async () => {
    // 账本创建人操作，删除账本
    const result = await remove(id);

    if (!result.data) {
      errorsNotify(result.errors);
      return;
    }

    // 删除成功后跳转到账本list页面
    navigation.navigate('Billings');
  };

  return (
    <View
      style={{
        padding: 20,
      }}>
      <Button
        mode="outlined"
        onPress={onGo2Transactions}
        style={{
          borderColor: theme.colors.primary,
          borderRadius: 24,
          borderWidth: 2,
          marginBottom: 16,
        }}>
        查看交易明细
      </Button>

      <Divider
        style={{
          marginBottom: 16,
        }}
      />

      {/* 账本UI */}
      {billing && (
        <BillingCard
          billing={billing?.billing}
          style={{
            marginBottom: 16,
          }}
        />
      )}

      <Divider
        style={{
          marginBottom: 16,
        }}
      />

      {/* 账本的分享和删除功能 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <Button
          mode="contained"
          style={styles.handler}
          contentStyle={styles.handlerContent}
          onPress={onShare}>
          分 享
        </Button>
        <Button
          mode="contained"
          style={styles.handler}
          color={theme.colors.error}
          contentStyle={styles.handlerContent}
          onPress={onDelete}>
          删 除
        </Button>
      </View>
    </View>
  );
};

export default Billing;

const styles = StyleSheet.create({
  handler: {
    borderRadius: 24,
    flex: 1,
    marginHorizontal: 12,
  },

  handlerContent: {
    height: 48,
  },
});
