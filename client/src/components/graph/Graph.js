import React from "react";
import "./Graph.scss";

import { Alert, Spinner } from "reactstrap";
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
export const Graph = ({ mode, dataFilter, onShowData, loadData, error }) => {
  return (
    <div className={`graph ${mode ? "dark" : "light"}`}>
      {error && (
        <Alert color="danger">
          {error.message || "Une erreur est survenue"}
        </Alert>
      )}
      {!loadData && <Spinner color="primary" />}
      {onShowData && (
        <>
          <h2 style={{ marginLeft: "60px" }}> Taux d'incidences</h2>
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

              <YAxis
                label={{
                  value: "Nombre de cas positifs",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Legend />
              <Line
                name="homme"
                type="monotone"
                dataKey="P_h"
                stroke="#1014DE"
              />
              <Line
                name="femme"
                type="monotone"
                dataKey="P_f"
                stroke="#C71585"
              />
              <Line
                name="homme et femme"
                type="monotone"
                dataKey="P"
                stroke="#F51604"
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
};
