import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CustomTooltips from './CustomTooltips';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({ data, label, colors }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
           labelLine={false}
          // label={({ name, percent }) =>
          //   `${name} ${(percent * 100).toFixed(0)}%`
          // }
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltips/>} />
        <Legend content={<CustomLegend/>}/>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CustomPieChart;
