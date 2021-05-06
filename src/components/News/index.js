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
      fetch("https://newsapi.org/v2/everything?q=cryptocurrency&apiKey=908d8c2102a046daaf340f1b9683e2d6")
        .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.articles);
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
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className='gutter-row' span={6}>
            <BlockchainBacker />
            </Col>
          {items.map(item => (
              <Col className="gutter-row" span={6}>
  <Card
  style={{ width: 300 }}
  cover={
    <img
      alt="example"
      src={item.urlToImage}
    />
  }
  actions={[
    <ReadOutlined onClick={()=>{window.open(item.url)}} key="read"  />,
    <EditOutlined key="edit" />,
    <EllipsisOutlined key="ellipsis"  />,
  ]}
>
    {item.source.name}
  <Meta
    title={item.title}
    description={item.description}
  />
</Card>
      </Col>  ))}

</Row>
            </div>

      );
    }
  


export default News;