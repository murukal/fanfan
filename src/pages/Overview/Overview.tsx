import {useQuery} from '@apollo/client';
import React, {useMemo} from 'react';
import {SafeAreaView, useWindowDimensions, View} from 'react-native';
import {Button, Colors, Text} from 'react-native-paper';
import {VictoryPie} from 'victory-native';
import {gap} from '.';
import {CATEGORY_STATISTICS} from '../../apis/category';
import TransactionList from '../../components/Transaction/List';

const Overview = () => {
  const windowWidth = useWindowDimensions().width;
  const chartSize = useMemo(() => windowWidth - gap * 2, [windowWidth]);

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
        prev.data.push({
          x: current.id,
          y: current.totalExpense,
        });
        prev.colorScale.push(colors[Math.floor(Math.random() * colors.length)]);
        return prev;
      },
      {
        data: [] as {x: number; y: number}[],
        colorScale: [] as string[],
      },
    );
  }, [data]);

  return (
    <SafeAreaView>
      <TransactionList
        billingId={80}
        padding={gap}
        ListHeaderComponent={
          <>
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
              data={statistics?.data}
              colorScale={statistics?.colorScale}
              labels={() => null}
              width={chartSize}
              height={chartSize}
              cornerRadius={20}
              padding={gap}
            />
            {/* 交易明细 */}
            <View
              style={{
                marginBottom: gap,
              }}>
              <Text>交易明细</Text>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Overview;
