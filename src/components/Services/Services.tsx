import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {useNavigation} from '../../utils/navigation';

// 图片资源引入
const transactionImage = require('../../../public/images/transaction.jpeg');
const billingsImage = require('../../../public/images/billings.jpeg');
const wantImage = require('../../../public/images/want.jpeg');
const todoImage = require('../../../public/images/todo.jpeg');

const Services = () => {
  const navigation = useNavigation();
  const billingId = useSelector<State, number | undefined>(
    state => state.userProfile.user?.moneyProfile?.defaultBilling?.id,
  );

  const services = [
    {
      title: '新建交易',
      image: transactionImage,
      onPress: () => {
        // 未设置默认账本
        if (!billingId) {
          return;
        }

        navigation.navigate('Transaction', {
          billingId,
        });
      },
    },
    {
      title: '我的账本',
      image: billingsImage,
      onPress: () => {
        navigation.navigate('Billings');
      },
    },
    {
      title: '心愿单',
      image: wantImage,
      onPress: () => {},
    },
    {
      title: '记事本',
      image: todoImage,
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
