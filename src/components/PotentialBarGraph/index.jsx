import React from 'react';
import {  Card }from 'antd';
import useFetch from '../../util/useFetch'
import { getCoinsGraphData } from '../../util/coinData';
import { useQuery, gql } from '@apollo/client';
import BarGraph from './BarGraph'


function PotentialBarGraph(props) {
  const { loading, error, data } = useFetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin-cash%2Cripple%2Ceos%2Cdogecoin%2Cdash%2Czcash')
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
    
  return (
   <Card title="Percentage to Target Price">
       <BarGraph data={getCoinsGraphData(0,data)} rowName='name' columnName='percentage'/> 
    </Card>
  );
};

export default PotentialBarGraph;
