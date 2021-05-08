import React, { useEffect, useState } from "react";
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { EditOutlined, EllipsisOutlined, ReadOutlined } from '@ant-design/icons';
import BlockchainBacker from '../BlockchainBacker';
const { Meta } = Card;

function News() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
  
    useEffect(() => {
      fetch("https://cryptopanic.com/api/v1/posts/?auth_token=494c032bfd35161464f13b53e627f78f26e045fa&public=true")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            if(result) {
             setItems(result.results); 
            } else {
              setError(error);
            }
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }  
    if (!isLoaded) {
      return <div>Loading...</div>;
    }  


        console.log(items)
        return (
            <div className="container">
                <h1>News</h1>
                <Row gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 },16]} >
            <Col className='gutter-row' xs={16} sm={12} md={8} lg={8} xl={6}>
            <BlockchainBacker />
            </Col>
          {items.map(item => (
              <Col className="gutter-row"   xs={16} sm={12} md={8} lg={8} xl={6}>
  <Card
  style={{ width: 300 }}
  extra={fetchName(item)}
  actions={[
    <ReadOutlined onClick={()=>{window.open(item.url)}} key="read"  />,
  ]}
>
    {item.source.name}
  <Meta
    title={item.title}
    description={item.title}
  />
</Card>
      </Col>  ))}

</Row>
            </div>

      );
    }
  

function fetchName(item) {
const name = item.currencies ? item.currencies.map(currency => currency.code).toString() : 'General'

  return name
}

export default News;