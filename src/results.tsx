import React from "react";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { useRecoilValue } from "recoil";
import { moneyDistribution, simulationFunc } from "./state";
import * as d3 from "d3";

export const Chart = React.memo(() => {
  const data = useRecoilValue(moneyDistribution);
  const sim = useRecoilValue(simulationFunc);
  return (
    <div>
      <h2>Uniform Sampling</h2>
      <ScatterChart
        width={400}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="%" unit="" />
        <YAxis type="number" dataKey="y" name="money" unit="$" />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
      <div>{`Mean: ${d3.mean(data, d => d.y)}`}</div>
      <div>{`Median: ${d3.median(data, d => d.y)}`}</div>
      <div>{`Std Dev: ${d3.deviation(data, d => d.y)}`}</div>
    </div>
  );
});
