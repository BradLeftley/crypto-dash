import React from 'react';
import { Card } from 'antd';
import { useFetchAll } from '../../util/useFetch'
import { Line } from '@ant-design/charts';
import coinData from '../../util/coinData';

const createEndpoints = () => {
  return coinData.map(coin => `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=365`)
}
const mapOHCLdata = (item, name, targetPrice) => {
  return item.map((data) => {
    const percentage = (((data[1] / targetPrice)) * 100)
    const roundedPercent = Math.round((percentage + Number.EPSILON) * 100) / 100;
    return { name, time: new Date(parseInt(data[0])).toISOString().split('T')[0], open: roundedPercent }
  })
}
function GrowthChart(props) {
  const { loading, error, data } = useFetchAll(createEndpoints())

  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
  let testData = []
  data.forEach((item, index) => testData.push(...mapOHCLdata(item, coinData[index].name, coinData[index].target[0])))


  var config = {
    data: testData,
    xField: 'time',
    yField: 'open',
    seriesField: 'name',

    legend: { position: 'top' },
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 5000,
      },
    },
  };
  return (
    <Card title="Percentage to Target Price">
      <Line {...config} />
    </Card>
  );
};

export default GrowthChart;