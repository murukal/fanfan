import React from 'react';
import {useRoute} from '@react-navigation/native';
import {View} from 'react-native';
import {Button, Divider, Text, useTheme} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Billing = () => {
  const route = useRoute();
  const theme = useTheme();

  console.log('route====', route);

  return (
    <View
      style={{
        padding: 20,
      }}>
      <Button
        mode="outlined"
        onPress={() => console.log('Pressed')}
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

      {/* 账本余额 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <Text>收支</Text>
        <Text>18222</Text>
      </View>

      {/* 账本UI */}
      <View
        style={{
          height: 200,
          backgroundColor: 'black',
          borderRadius: 24,
          marginBottom: 16,
        }}>
        <Text>收支</Text>
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
        }}>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="home" size={24} />
        </View>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <MaterialCommunityIcons name="home" size={24} />
        </View>
      </View>
    </View>
  );
};

export default Billing;
