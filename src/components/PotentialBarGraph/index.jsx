import React, { useState } from "react";
import { Card, Radio, Checkbox, Spin } from "antd";
import useFetch from "../../util/useFetch";
import { getCoinsGraphData } from "../../util/coinData";
import BarGraph from "./BarGraph";
import { defaultlocalStorageCoinData } from "../../util/coinData";
import useLocalStorage from "../../util/useLocalStorage";

const listCoinIds = (coins) => {
  return coins.map((coin) => coin.id);
};

const createCheckBoxOptions = (data) =>
  data.map((item) => ({ label: item.name, value: item.name }));

function PotentialBarGraph(props) {
  const [targetValue, setTargetValue] = useState("0");
  const [coins, setCoins] = useLocalStorage(
    "coinData",
    defaultlocalStorageCoinData
  );
  const checkboxData = createCheckBoxOptions(coins);
  const [itemSelected, setItemsSelected] = useState(
    checkboxData.map((item) => item.value)
  );
  const { loading, error, data } = useFetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${listCoinIds(
      coins
    ).toString()}`
  );
  if (loading) return <Spin />;
  if (error) return <p>Error :(</p>;

  let filteredData = [];
  itemSelected.forEach((item) =>
    filteredData.push(...coins.filter((filter) => item === filter.name))
  );
  const checkBoxChange = (value) => {
    setItemsSelected(value);
  };

  return (
    <Card title="Percentage to Target Price">
      <Radio.Group
        value={targetValue}
        onChange={(e) => {
          setTargetValue(e.target.value);
        }}
      >
        <Radio.Button value="0">target 1</Radio.Button>
        <Radio.Button value="1">target 2</Radio.Button>
        <Radio.Button value="2">target 3</Radio.Button>
      </Radio.Group>
      <br />
      <br />
      <Checkbox.Group
        defaultValue={itemSelected}
        options={checkboxData}
        onChange={checkBoxChange}
      />
      <BarGraph
        data={getCoinsGraphData(filteredData, targetValue, data)}
        rowName="name"
        columnName="percentage"
      />
    </Card>
  );
}

export default PotentialBarGraph;
