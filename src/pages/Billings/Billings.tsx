import {useQuery} from '@apollo/client';
import {ScrollView, View} from 'react-native';
import {BILLINGS, createBilling} from '../../apis/billing';
import React from 'react';
import {BillingCard} from '../../components/Billing';
import {Billing} from '../../typings/billing';
import {Button, Divider, IconButton, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {NavigationMetadata} from '../../typings/navigation';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {UserProfile} from '../../redux/user-profile';

const Billings = () => {
  const navigation = useNavigation<NavigationMetadata>();
  const userProfile = useSelector<State, UserProfile>(
    state => state.userProfile,
  );

  /**
   * 获取账本
   */
  const {data, refetch} = useQuery(BILLINGS, {
    fetchPolicy: 'no-cache',
  });

  /**
   * 创建账本
   */
  const onCreateBilling = async () => {
    // 未登录跳转登录页面
    if (!userProfile.isLogin) {
      navigation.navigate('Account');
      return;
    }

    // 创建账本
    await createBilling({
      name: 'cceshi',
    });

    refetch();
  };

  /**
   * 查看账单明细
   */
  const onGo2Billing = () => {
    navigation.navigate('Billing');
  };

  /**
   * 账本渲染
   */
  const renderBilling = (billing: Billing) => {
    return (
      <View key={billing.id}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 12,
          }}>
          <Text
            style={{
              marginLeft: 6,
            }}>
            {billing.name}
          </Text>

          <Text
            style={{
              marginLeft: 'auto',
            }}>
            余额：12312312
          </Text>

          <IconButton
            icon="dots-horizontal"
            color="grey"
            size={16}
            onPress={onGo2Billing}
          />
        </View>

        <BillingCard billing={billing} />

        <Divider
          style={{
            marginBottom: 16,
          }}
        />
      </View>
    );
  };

  return (
    <ScrollView>
      {data?.billings.map(item => renderBilling(item))}

      <Button
        icon="plus"
        mode="contained"
        onPress={onCreateBilling}
        contentStyle={{
          height: 56,
        }}
        style={{
          borderRadius: 999,
        }}>
        添 加 账 本
      </Button>
    </ScrollView>
  );
};

export default Billings;
