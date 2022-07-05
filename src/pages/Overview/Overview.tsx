import {useQuery} from '@apollo/client';
import dayjs from 'dayjs';
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
   * 起始时间
   */
  const from = useMemo(
    () => dayjs().subtract(7, 'day').startOf('day').toDate(),
    [],
  );

  const to = useMemo(() => new Date(), []);

  /**
   * 获取统计数据
   */
  const {data} = useQuery(CATEGORY_STATISTICS, {
    variables: {
      timeRangeInput: {
        from,
        to,
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
          title: current.name,
        });
        prev.colorScale.push(colors[Math.floor(Math.random() * colors.length)]);
        return prev;
      },
      {
        data: [] as {x: number; y: number; title: string}[],
        colorScale: [] as string[],
      },
    );
  }, [data]);

  return (
    <SafeAreaView>
      <TransactionList
        billingId={80}
        padding={gap}
        timeRange={[from]}
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

            {/* 统计表图的数据展现 */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginLeft: 24,
                marginBottom: 24,
              }}>
              {statistics?.data
                .filter(datum => datum.y)
                .map((datum, index) => {
                  return (
                    <View
                      key={datum.x}
                      style={{
                        flexBasis: '50%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 8,
                      }}>
                      {/* 分组颜色 */}
                      <View
                        style={{
                          width: 12,
                          height: 12,
                          backgroundColor: statistics?.colorScale[index],
                          borderRadius: 4,
                        }}
                      />

                      {/* 分组名称 */}
                      <Text
                        style={{
                          marginHorizontal: 8,
                          fontSize: 12,
                        }}>
                        {datum.title}
                      </Text>

                      {/* 分组金额 */}
                      <Text
                        style={{
                          fontSize: 12,
                        }}>
                        {`¥ ${datum.y}`}
                      </Text>
                    </View>
                  );
                })}
            </View>

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
