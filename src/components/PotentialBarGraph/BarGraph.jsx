import React from 'react';
import { Column } from '@ant-design/charts';


function BarGraph(props) {
  const {data, columnName, rowName } = props;
  const config = {
    data,
    xField: rowName,
    yField: columnName,
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    seriesField: 'name',
  };
 

  return (
      <Column
        {...config}
        onReady={(plot) => {
          plot.on('plot:click', (evt) => {
            const { x, y } = evt;
            const { xField } = plot.options;
            const tooltipData = plot.chart.getTooltipItems({ x, y });
            console.log(tooltipData);
          });
        }}
      />
  );
};

export default BarGraph;
