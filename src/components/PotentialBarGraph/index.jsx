import React from 'react';
import {  Card }from 'antd';
import { Column } from '@ant-design/charts';
import coinsData from '../../util/coinData';
import { getCoinsGraphData } from '../../util/coinData';
import { useQuery, gql } from '@apollo/client';
import BarGraph from './BarGraph'

const EXCHANGE_RATES = gql`
    query MarketTicker {
  Dash: markets(marketSymbol:"Binance:dash/USDT") {
    ticker {
      lastPrice
    }
  }
   Xrp: markets(marketSymbol:"Binance:XRP/USDT") {
    ticker {
      lastPrice
    }
  }Zcash: markets(marketSymbol:"Binance:ZEC/USDT") {
    ticker {
      lastPrice
    }
  }
  Eos: markets(marketSymbol:"Binance:EOS/USDT") {
    ticker {
      lastPrice
    }
  }
}
`;

function PotentialBarGraph(props) {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
  return (
   <Card title="Percentage to Target Price">
      <BarGraph data={getCoinsGraphData(0,data)} rowName='name' columnName='percentage'/>
    </Card>
  );
};

export default PotentialBarGraph;
