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
import { simplifyDistribution } from "./functions";
import { sortBy } from "lodash";

type DP = {
  x: number;
  y: number;
};

export const Simulate = React.memo(() => {
  const [data, setData] = React.useState([] as DP[]);
  const sim = useRecoilValue(simulationFunc);

  const simulate = (iter: number) => {
    let result: number[] = [];
    for (let i = 0; i < iter; i += 1) {
      result.push(sim());
    }
    result = sortBy(result, d => d);
    const simplified = simplifyDistribution(result, iter / 1000);
    setData(simplified.map((n, i) => ({ x: i, y: n })));
  };

  return (
    <div>
      <h2>Monte Carlo</h2>
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
      <button onClick={() => simulate(1000000)}>Simulate 1M Iterations</button>
      <button onClick={() => simulate(100000)}>Simulate 100k Iterations</button>
      <button onClick={() => simulate(10000)}>Simulate 10k Iterations</button>
      <button onClick={() => setData([])}>Clear</button>
    </div>
  );
});
