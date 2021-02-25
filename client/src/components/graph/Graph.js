import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
export const Graph = ({ mode, dataFilter }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={dataFilter}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        padding={{
          top: 50,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="jour" />

        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="P_h" stroke="#1014DE" />
        <Line type="monotone" dataKey="P_f" stroke="#C71585" />
      </LineChart>
    </ResponsiveContainer>
  );
};
