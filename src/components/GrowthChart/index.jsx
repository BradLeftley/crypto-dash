import React, { useState } from "react";
import { Card, Checkbox, Radio, Spin } from "antd";
import { useFetchAll } from "../../util/useFetch";
import { Line } from "@ant-design/charts";
import { defaultlocalStorageCoinData } from "../../util/coinData";
import useLocalStorage from "../../util/useLocalStorage";

const createEndpoints = (coins, days) => {
  return coins.map(
    (coin) =>
      `https://api.coingecko.com/api/v3/coins/${coin.id}/ohlc?vs_currency=usd&days=${days}`
  );
};

const createCheckBoxOptions = (data) =>
  data.map((item) => ({ label: item.name, value: item.name }));

const mapOHCLdata = (item, name, targetPrice) => {
  return item.map((data) => {
    const percentage = (data[1] / targetPrice) * 100;
    const roundedPercent =
      Math.round((percentage + Number.EPSILON) * 100) / 100;
    return {
      name,
      time: new Date(parseInt(data[0])).toISOString().split("T")[0],
      open: roundedPercent,
    };
  });
};

function GrowthChart(props) {
  const [timePeriod, setTimePeriod] = useState("90");
  const [coins, setCoins] = useLocalStorage(
    "coinData",
    defaultlocalStorageCoinData
  );
  const checkboxData = createCheckBoxOptions(coins);
  const [itemSelected, setItemsSelected] = useState(
    checkboxData.map((item) => item.value)
  );
  const { loading, error, data } = useFetchAll(
    createEndpoints(coins, timePeriod),
    null,
    timePeriod
  );

  if (loading) return <Spin />;
  if (error) return <p>Error :(</p>;
  let testData = [];
  data.forEach((item, index) =>
    testData.push(
      ...mapOHCLdata(item, coins[index].name, coins[index].target[0])
    )
  );

  const handleSizeChange = (e) => {
    setTimePeriod(e.target.value);
  };
  const checkBoxChange = (value) => {
    setItemsSelected(value);
  };

  let filteredData = [];
  itemSelected.forEach((item) =>
    filteredData.push(...testData.filter((filter) => item === filter.name))
  );

  var config = {
    data: filteredData,
    xField: "time",
    yField: "open",
    seriesField: "name",

    legend: { position: "top" },
    smooth: true,
    animation: {
      appear: {
        animation: "path-in",
        duration: 5000,
      },
    },
  };

  return (
    <Card title="Percentage to Target Price">
      <Radio.Group value={timePeriod} onChange={handleSizeChange}>
        <Radio.Button value="7">1W</Radio.Button>
        <Radio.Button value="30">1M</Radio.Button>
        <Radio.Button value="90">3M</Radio.Button>
        <Radio.Button value="180">6M</Radio.Button>
        <Radio.Button value="365">1Y</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Checkbox.Group
        defaultValue={itemSelected}
        options={checkboxData}
        onChange={checkBoxChange}
      />
      <Line {...config} />
    </Card>
  );
}

export default GrowthChart;
