import React, { useState, useEffect } from 'react';
import { Pie } from '@ant-design/charts';
import {  Card }from 'antd';

const PieChart = () => {
  var data = [
    {
      type: "g",
      value: 27
    },
    {
      type: "s",
      value: 25
    },
    {
      type: "u",
      value: 18
    },
    {
      type: "f",
      value: 15
    },
    {
      type: "t",
      value: 10
    },
    {
      type: "j",
      value: 50
    }
  ];
  var config = {
    appendPadding: 10,
    data: data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.64,
    showTitle: false,
    title: "fdsfsd",
    label: {
      labelLine: false,
      alias: "g",
      title: "brad",
      type: "inner",
      offset: "-50%",
      style: { textAlign: "center" },
      autoRotate: false,
      content: "{value}"
    },
    legend: false,
    statistic: {
      title: {
        customHtml: 'Total'
      },
    },
    annotations: [
      {
        type: 'text',
        position: ['median', 'median'],
        content: '',
        style: {
          fill: 'red',
        },
      },
    ],
    interactions: [
      { type: "element-selected" },
      { type: "element-active" },
      { type: "pie-statistic-active" }
    ]
  };
  return <Card> <Pie  {...config} /></Card>
 ;
};

export default PieChart;