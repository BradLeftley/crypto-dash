import React, { useState, useEffect } from "react";
import { Treemap } from "@ant-design/charts";
import { Card, Spin } from "antd";

const TreeMap = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false"
    )
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
    return (
      <Card>
        <Spin />
      </Card>
    );
  }
  const dataObj = items.map((value) => {
    return {
      name: value.name,
      value: value.market_cap,
      total: 12,
    };
  });
  var data = {
    name: "root",
    children: dataObj,
  };
  var config = {
    data: data,
    colorField: "name",
    tooltip: {
      formatter: (datum) => {
        const value = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(datum.value);
        return { name: datum.name, value: value };
      },
    },
  };
  return (
    <Card title="Market Cap">
      <Treemap {...config} />
    </Card>
  );
};

export default TreeMap;
