import React, { useState, useEffect } from "react";
import configServer from "../configServer.json";
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
import axios from "axios";

export const Graph = () => {
  const [data, setData] = useState({});
  useEffect(async () => {
    const fetchDataCovid = async () => {
      const result = await axios.get(configServer.urlServer).catch((err) => {
        console.error(err);
      });
      try {
        result.data.length = 100;
        result.data.forEach((data) => {
          data.P_h = parseInt(data.P_h);
          data.P = parseInt(data.P);
          data.P_f = parseInt(data.P_f);
          data.cl_age90 = parseInt(data.cl_age90);
        });
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataCovid();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart
        data={data}
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
        <Line type="monotone" dataKey="P_h" stroke="#82ca9d" />
        <Line type="monotone" dataKey="P_f" stroke="#312A6C" />
      </LineChart>
    </ResponsiveContainer>
  );
};
