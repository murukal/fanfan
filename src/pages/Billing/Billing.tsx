import {useMutation, useQuery} from '@apollo/client';
import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Caption, Divider, Switch, useTheme} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {Props} from '.';
import {BILLING, REMOVE, SWITCH_DEFAULT} from '../../apis/billing';
import {TargetType} from '../../apis/share';
import {BillingCard} from '../../components/Billing';
import {State} from '../../redux';
import {BillingProp} from '../../typings/navigation';
import {Notify} from '../../utils';
import {useNavigation, useRoute} from '../../utils/navigation';
import {authenticate} from '../../redux/user-profile';

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

  const isDefault = useSelector<State, boolean>(
    state => state.userProfile.user?.moneyProfile?.defaultBilling?.id === id,
  );

  const [remove] = useMutation(REMOVE);
  const [switchDefault] = useMutation(SWITCH_DEFAULT);
  const dispatch = useDispatch();

  /**
   * 查看交易明细
   */
  const onGo2Transactions = () => {
    navigation.navigate('transactions', {
      billingId: id,
    });
  };

  /**
   * 分享账单
   */
  const onShare = () => {
    navigation.navigate('users', {
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
    const res = await remove({
      variables: {
        id,
      },
    }).catch((error: Error) => {
      Notify.error({
        title: error.message,
      });
      return null;
    });

    // 删除成功后跳转到账本list页面
    res?.data?.removeBilling && navigation.navigate('billings');
  };

  /**
   * 创建交易
   */
  const onCreateTransaction = () => {
    navigation.navigate('transaction', {
      billingId: id,
    });
  };

  /**
   * 切换是否默认
   */
  const onIsDefaultToggle = async () => {
    const res = await switchDefault({
      variables: {
        id,
        isDefault: !isDefault,
      },
    }).catch(() => null);

    // 切换失败
    // 退出函数执行
    if (!res?.data?.switchDefault) {
      Notify.error({
        title: '切换失败',
      });
      return;
    }

    await dispatch<any>(authenticate());
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

      {/* 设置默认账本控件 */}
      <View
        style={{
          marginBottom: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: 12,
        }}>
        <Caption>是否默认</Caption>
        <Switch value={isDefault} onValueChange={onIsDefaultToggle} />
      </View>

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
          marginBottom: 16,
        }}>
        <Button
          mode="outlined"
          style={[styles.handler]}
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

      {/* 新建交易 */}
      <Button
        mode="contained"
        contentStyle={styles.handlerContent}
        onPress={onCreateTransaction}
        style={{
          borderRadius: 99,
          marginHorizontal: 12,
        }}>
        记 一 笔
      </Button>
    </View>
  );
};

export default Billing;

const styles = StyleSheet.create({
  handler: {
    borderRadius: 99,
    flex: 1,
    marginHorizontal: 12,
  },

  handlerContent: {
    height: 48,
  },
});
