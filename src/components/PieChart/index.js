import React, { useState, useEffect } from "react";
import { Pie } from "@ant-design/charts";
import { Card } from "antd";

const PieChart = () => {
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

  const dataObj = items.map((value) => {
    return {
      name: value.asset,
      value: parseFloat(value.free),
      total: 12,
    };
  });

  var config = {
    appendPadding: 10,
    data: dataObj,
    angleField: "total",
    colorField: "name",
    radius: 1,
    innerRadius: 0.64,
    label: {
      type: "inner",
      offset: "-50%",
      style: { textAlign: "center" },
      autoRotate: false,
      content: "{value}",
    },
    statistic: {
      title: {
        customHtml: "Total",
      },
    },
    annotations: [
      {
        type: "text",
        position: ["median", "median"],
        content: "",
        style: {
          fill: "red",
        },
      },
    ],
    interactions: [
      { type: "element-selected" },
      { type: "element-active" },
      { type: "pie-statistic-active" },
    ],
  };
  return (
    <Card>
      {" "}
      <h1>Assets</h1> <Pie {...config} />
    </Card>
  );
};

export default PieChart;
