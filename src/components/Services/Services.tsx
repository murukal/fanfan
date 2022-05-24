import React from 'react';
import {Image, Pressable, View} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {State} from '../../redux';
import {useNavigation} from '../../utils/navigation';

const Services = () => {
  const navigation = useNavigation();
  const billingId = useSelector<State, number | undefined>(
    state => state.userProfile.user?.moneyProfile.defaultBilling.id,
  );

  const services = [
    {
      title: '新建交易',
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
      onPress: () => {
        navigation.navigate('Billings');
      },
    },
    {
      title: '心愿单',
      onPress: () => {
        console.log('12321');
      },
    },
    {
      title: '记事本',
      onPress: () => {
        console.log('12321');
      },
    },
  ];

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 16,
        }}>
        <Title>Services</Title>
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
                  width: 50,
                  height: 50,
                  borderRadius: 999,
                  marginBottom: 12,
                }}
                source={{
                  uri: 'https://picsum.photos/700',
                }}
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
