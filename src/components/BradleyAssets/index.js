import { Card } from "antd";
import { List, Avatar } from "antd";
import React, { useEffect, useState } from "react";

function BradleyAssets(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://covid-bradley.s3.eu-west-2.amazonaws.com/crypto.json")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  return (
    <Card title="Assets">
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.asset}</a>}
              description={item.free}
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default BradleyAssets;
