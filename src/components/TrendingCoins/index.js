import React from 'react';
import {  Card }from 'antd';
import useFetch from '../../util/useFetch'
import { List, Avatar } from 'antd';



function TrendingCoins(props) {
  const { loading, error, data } = useFetch('https://api.coingecko.com/api/v3/search/trending')
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;
    
  return (
      <Card title='Trending Coins'>
          
    <List
    itemLayout="horizontal"
    dataSource={data.coins}
    renderItem={item => (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar src={item.item.small} />}
          title={item.item.name}
        />
      </List.Item>
    )}
  />
      </Card>

  );
};

export default TrendingCoins;