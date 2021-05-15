import React, { useState } from 'react';
import {  Card, Radio }from 'antd';
import useFetch from '../../util/useFetch'
import { getCoinsGraphData } from '../../util/coinData';
import { useQuery, gql } from '@apollo/client';
import BarGraph from './BarGraph'


function PotentialBarGraph(props) {
  const [ targetValue, setTargetValue ] = useState("0")
  const { loading, error, data } = useFetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin-cash%2Cripple%2Ceos%2Cdogecoin%2Cdash%2Czcash')
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
    
  return (
   <Card title="Percentage to Target Price">
     <Radio.Group value={targetValue} onChange={(e)=>{setTargetValue(e.target.value)}}>
          <Radio.Button value="0">target 1</Radio.Button>
          <Radio.Button value="1">target 2</Radio.Button>
          <Radio.Button value="2">target 3</Radio.Button>
        </Radio.Group>
       <BarGraph data={getCoinsGraphData(targetValue,data)} rowName='name' columnName='percentage'/> 
    </Card>
  );
};

export default PotentialBarGraph;
