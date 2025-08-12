import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const getBarColor = (entry) => {
  switch (entry?.status) {
    case "Low":
      return "#00BC70";
    case "Medium":
      return "#FE9900";
    case "High":
      return "#FF1F57";
    default:
      return "#00BC70";
  }
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300 ">
        <p className="text-xs font-semibold text-purple-800">
          {payload[0].payload.priority}
        </p>
        <p className="text-sm text-gray-600">
          Count:{" "}
          <span className="text-sm font-medium text-gray-900">
            {payload[0].payload.count}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomBarChart = ({ data }) => (
  <div className="bg-white mt-6">
    <ResponsiveContainer width="100%" height={290}>
      <BarChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis
          dataKey="status"
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <YAxis
          tick={{ fontSize: 12, fill: "#555" }}
          stroke="none"
        />
        <Tooltip content={CustomTooltip} cursor={{ fill: "transparent" }} />
        <Bar
          dataKey="count"
          radius={[10, 10, 0, 0]}
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={getBarColor(entry)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default CustomBarChart;