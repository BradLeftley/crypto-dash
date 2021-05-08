import React from 'react';
import {  Card }from 'antd';
import useFetch from '../../util/useFetch'
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
  const { loading, error, data } = useFetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin-cash%2Cripple%2Ceos%2Cdogecoin%2Cdash%2Czcash')
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
    console.log(loading, error, data )
  return (
   <Card title="Percentage to Target Price">
       <BarGraph data={getCoinsGraphData(0,data)} rowName='name' columnName='percentage'/> 
    </Card>
  );
};

export default PotentialBarGraph;
