import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {Notify} from '../../utils';
import {useNavigation} from '../../utils/navigation';

const Services = () => {
  const navigation = useNavigation();
  const billingId = useSelector<State, number | undefined>(
    state => state.userProfile.user?.moneyProfile?.defaultBilling?.id,
  );
  const isLoggedIn = useSelector<State, boolean>(
    state => state.userProfile.isLoggedIn,
  );

  const services = [
    {
      title: '新建交易',
      image: require('../../../public/images/transaction.jpeg'),
      onPress: () => {
        // 未登陆，跳转登陆
        if (!isLoggedIn) {
          navigation.navigate('layout', {
            screen: 'setting',
          });
          return;
        }

        // 未设置默认账本
        if (!billingId) {
          Notify.error({
            title: '您还没有设置默认账本，请先设置默认账本',
          });
          return;
        }

        navigation.navigate('transaction', {
          billingId,
        });
      },
    },
    {
      title: '我的账本',
      image: require('../../../public/images/billings.jpeg'),
      onPress: () => {
        navigation.navigate('billings');
      },
    },
    {
      title: '心愿单',
      image: require('../../../public/images/want.jpeg'),
      onPress: () => {},
    },
    {
      title: '记事本',
      image: require('../../../public/images/todo.jpeg'),
      onPress: () => {},
    },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 16,
        }}>
        <Title>快捷方式</Title>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {services.map((service, index) => (
          <Pressable key={index} onPress={service.onPress}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                }}
                source={service.image}
              />

              <Text>{service.title}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </>
  );
};

export default Services;
