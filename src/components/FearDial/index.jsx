import React, { useState, useEffect } from 'react';
import { Gauge } from '@ant-design/charts';
import { Card } from "antd";

const FearDial = () => {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      fetch("https://api.alternative.me/fng/")
        .then((res) => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result.data[0]);
          },
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        );
    }, []);

    const percent = Math.round((items.value / 100) * 100) / 100;

  var ref;
  var ticks = [0, 1 / 3, 2 / 3, 1];
  var color = ['#F4664A', '#FAAD14', '#30BF78'];
  var config = {
    percent,
    range: {
      ticks: [0, 1],
      color: ['l(0) 0:#F4664A 0.5:#FAAD14 1:#30BF78'],
    },
    indicator: {
      pointer: { style: { stroke: '#D0D0D0' } },
      pin: { style: { stroke: '#D0D0D0' } },
    },
    statistic: {
      title: {
        formatter: function formatter(_ref) {

          return items.value_classification;
        },
        style: function style(_ref2) {
          var percent = _ref2.percent;
          return {
            fontSize: '36px',
            lineHeight: 1,
            color: percent < ticks[1] ? color[0] : percent < ticks[2] ? color[1] : color[2],
          };
        },
      },
      content: {
        offsetY: 36,
        style: {
          fontSize: '24px',
          color: '#4B535E',
        },
        formatter: function formatter() {
          return  '';
        },
      },
    },
  };

  return <Card title="Fear and Greed Index"><Gauge {...config} chartRef={(chartRef) => (ref = chartRef)} /></Card> ;
};

export default FearDial;