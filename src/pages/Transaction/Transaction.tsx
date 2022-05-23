import {
  ActivityIndicator,
  Avatar,
  Button,
  Chip,
  IconButton,
  Text,
  TextInput,
  Title,
  ToggleButton,
} from 'react-native-paper';
import React from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput as NativeTextInput,
  View,
} from 'react-native';
import {useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useQuery} from '@apollo/client';
import {CATEGORIES} from '../../apis/category';
import {Category} from '../../typings/category';
import {useRoute} from '@react-navigation/native';

const directions = {
  in: '收入',
  out: '支出',
};

const Transaction = () => {
  const [direction, setDirection] = useState<keyof typeof directions>('out');
  const [categoryId, setCategoryId] = useState<number>();
  const route = useRoute();

  console.log('route===', route.params);

  /**
   * 请求分类
   */
  const {data: categories, loading: isCategoriesLoading} = useQuery(CATEGORIES);

  /**
   * 切换交易方向
   */
  const onSwitch = () => {
    direction === 'in' ? setDirection('out') : setDirection('in');
  };

  /**
   * 分享
   */
  const onShare = () => {
    console.log('12321');
  };

  /**
   * 渲染分类
   */
  const categoryRender = ({item}: {item: Category}) => {
    const isCurrent = item.id === categoryId;

    return (
      <View
        style={{
          alignItems: 'center',
          margin: 8,
        }}>
        <ToggleButton
          icon={item.icon}
          status={isCurrent ? 'checked' : 'unchecked'}
          onPress={() => {
            setCategoryId(item.id);
          }}
        />

        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ScrollView
        style={{
          padding: 20,
        }}
        contentContainerStyle={{
          flex: 1,
        }}>
        <TextInput
          style={{
            borderRadius: 16,
            marginBottom: 24,
          }}
          mode="outlined"
          placeholder="请输入交易金额"
          theme={{
            roundness: 20,
          }}
          render={props => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Chip
                  closeIcon={() => (
                    <MaterialCommunityIcons name="swap-horizontal" size={20} />
                  )}
                  onClose={onSwitch}
                  style={{
                    height: 32,
                    marginHorizontal: 12,
                  }}>
                  {directions[direction]}
                </Chip>
                <MaterialCommunityIcons name="currency-cny" size={20} />
                <NativeTextInput {...props} keyboardType="numeric" />
              </View>
            );
          }}
        />

        {/* 选择分类 */}
        <View
          style={{
            marginBottom: 24,
          }}>
          <Title style={[styles.title]}>选择分类</Title>

          {isCategoriesLoading ? (
            <ActivityIndicator
              animating={true}
              style={{
                marginTop: 24,
              }}
            />
          ) : (
            <FlatList
              horizontal
              data={categories?.categories.items}
              renderItem={categoryRender}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>

        {/* 备注 */}
        <View
          style={{
            marginBottom: 24,
          }}>
          <Title
            style={[
              styles.title,
              {
                marginBottom: 16,
              },
            ]}>
            备注
          </Title>
          <TextInput
            style={{
              padding: 8,
            }}
            multiline
            numberOfLines={4}
            theme={{
              roundness: 12,
            }}
          />
        </View>

        {/* share */}
        <View
          style={{
            marginBottom: 24,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Title style={[styles.title]}>有福同享，有难同当</Title>

            <IconButton icon="plus" onPress={onShare} />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array.from({
              length: 10,
            }).map((item, index) => (
              <Avatar.Text
                key={index}
                label="XD"
                size={48}
                style={{
                  marginHorizontal: 8,
                }}
              />
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            marginTop: 'auto',
            paddingBottom: 16,
          }}>
          <Button
            icon="cash-register"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            创建交易
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  title: {
    fontWeight: '700',
  },
});
