import {useLazyQuery, useMutation} from '@apollo/client';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {BILLINGS, CREATE} from '../../apis/billing';
import React, {useEffect} from 'react';
import {BillingCard} from '../../components/Billing';
import {Billing} from '../../typings/billing';
import {Button} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {UserProfile} from '../../redux/user-profile';
import {useNavigation} from '../../utils/navigation';
import {useIsFocused} from '@react-navigation/native';

const Billings = () => {
  const navigation = useNavigation();
  const userProfile = useSelector<State, UserProfile>(
    state => state.userProfile,
  );
  const [create] = useMutation(CREATE);
  const isFocused = useIsFocused();

  /**
   * 获取账本
   */
  const [getBillings, {data, refetch}] = useLazyQuery(BILLINGS, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (!isFocused) {
      return;
    }
    getBillings();
  }, [isFocused, getBillings]);

  /**
   * 创建账本
   */
  const onCreateBilling = async () => {
    // 未登录跳转登录页面
    if (!userProfile.isLoggedIn) {
      navigation.navigate('layout', {
        screen: 'setting',
      });
      return;
    }

    // 创建账本
    await create({
      variables: {
        createBillingInput: {
          name: '测试',
        },
      },
    });

    refetch();
  };

  /**
   * 账本渲染
   */
  const renderBilling = (billing: Billing) => {
    return (
      <View key={billing.id}>
        <BillingCard
          billing={billing}
          size="small"
          style={{
            marginBottom: 24,
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
        }}>
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
    </SafeAreaView>
  );
};

export default Billings;
