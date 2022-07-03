import {useQuery} from '@apollo/client';
import React, {useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  useWindowDimensions,
  View,
} from 'react-native';
import {Button, Colors, Text} from 'react-native-paper';
import {VictoryPie} from 'victory-native';
import {CATEGORY_STATISTICS} from '../../apis/category';

const Overview = () => {
  const windowWidth = useWindowDimensions().width;

  /**
   * 获取统计数据
   */
  const {data} = useQuery(CATEGORY_STATISTICS, {
    variables: {
      timeRangeInput: {
        from: new Date('2020-01-01'),
        to: new Date('2023-01-01'),
      },
    },
  });

  /**
   * 图像数据
   */
  const statistics = useMemo(() => {
    const colors = Object.values(Colors);

    return data?.categories.items.reduce(
      (prev, current) => {
        prev.x.push(current.id);
        prev.y.push(current.totalExpense);
        prev.colorScale.push(colors[Math.floor(Math.random() * colors.length)]);
        return prev;
      },
      {
        x: [] as number[],
        y: [] as number[],
        colorScale: [] as string[],
      },
    );
  }, [data]);

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{
          padding: 32,
        }}>
        {/* 标题 */}
        {/* 时间跨度选择器 */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>统计</Text>

          <Button mode="outlined">最近一周</Button>
        </View>

        {/* 统计图表 */}
        <VictoryPie
          data={statistics?.y}
          x={statistics?.x}
          colorScale={statistics?.colorScale}
          labels={() => null}
          width={windowWidth - 64}
          cornerRadius={20}
          padding={{
            bottom: 0,
            top: 0,
            left: 32,
            right: 32,
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Overview;
