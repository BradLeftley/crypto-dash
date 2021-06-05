import React from "react";
import { Card } from "antd";
import useFetch from "../../util/useFetch";
import { Stock } from "@ant-design/charts";

function BoxChart(props) {
  const { loading, error, data } = useFetch(
    "https://api.binance.com/api/v3/klines?symbol=XRPBUSD&interval=1w&limit=7"
  );
  if (loading) return <p>loading...</p>;
  if (error) return <p>Error :(</p>;

  let values = [];
  let x = data.map((value) => {
    values.push({
      openTime: value[0],
      open: parseFloat(value[1]),
      high: parseFloat(value[2]),
      low: parseFloat(value[3]),
      close: parseFloat(value[4]),
    });
  });

  var config = {
    width: 400,
    height: 500,
    data: values,
    xField: "openTime",
    yField: ["open", "close", "high", "low"],
  };
  console.log(values);

  return (
    <Card title="XRPBUSD / Last 7 Days">
      <Stock {...config} />
    </Card>
  );
}

export default BoxChart;
