import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import gaussian from "gaussian";
import { sortBy } from "lodash";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import * as d3 from "d3";
import Slider from "@material-ui/core/Slider";

function dist(n: number, mean = 0, variance = 1) {
  const distribution = gaussian(mean, variance);
  const L: number[] = [];
  const inc = 1 / n;
  for (let prob = inc * 0.5; prob < 1; prob += inc) {
    L.push(distribution.ppf(prob));
  }
  return L;
}

function shrink(L: number[], size = 100) {
  let n = 0;
  let s = 0;
  const result: number[] = [];
  for (let i = 0; i < L.length; i += 1) {
    s += L[i];
    n += 1;
    if (n === size) {
      result.push(s / size);
      n = 0;
      s = 0;
    }
  }
  return result;
}

function compose(
  dist1: number[],
  dist2: number[],
  f: (a: number, b: number) => number
) {
  const L: number[] = [];
  for (let i = 0; i < dist1.length; i += 1) {
    for (let j = 0; j < dist2.length; j += 1) {
      L.push(f(dist1[i], dist2[j]));
    }
  }
  const size = Math.round(Math.sqrt(dist1.length * dist2.length));
  const list = sortBy(L, d => d);
  const shrunk: number[] = shrink(list, size);
  return shrunk;
}

function avg(L: number[]) {
  return L.reduce((a, b) => a + b) / L.length;
}

type D = {
  x: number;
  y: number;
};

const App = () => {
  const [variance, setVariance] = React.useState(10);
  const [mean, setMean] = React.useState(5);

  const data = React.useMemo(() => {
    const roi = dist(
      100,
      Number(mean),
      Number(variance) > 0 ? Number(variance) : 0.0001
    );
    let money = dist(100, 10, 1).map(d => 10);
    for (let i = 0; i < 10; i += 1) {
      money = compose(money, roi, (a, b) => a + (a * b) / 100);
    }
    console.log({ roi, money, avg: d3.median(money) });
    return money.map((n, i) => ({ x: i, y: n }));
  }, [mean, variance]);

  return (
    <div>
      <button
        onClick={() => {
          // const dist1 = dist(100, 0, 5000);
        }}
      >
        click
      </button>
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
      <div>Mean:</div>

      <Slider
        value={mean}
        onChange={(e, val) => setMean(Number(val))}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={0}
        max={20}
      />
      <input
        value={mean}
        onChange={e => setMean(Number(e.target.value))}
        type="number"
      ></input>
      <div>Variance:</div>

      <Slider
        value={variance}
        onChange={(e, val) => setVariance(Number(val))}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={0}
        max={2000}
      />
      <input
        value={variance}
        onChange={e => setVariance(Number(e.target.value))}
        type="number"
      ></input>
      <div>{`Median: ${d3.median(data, d => d.y)}`}</div>
      <div>{`Mean: ${d3.mean(data, d => d.y)}`}</div>
      <div>{`st. dev.: ${d3.deviation(data, d => d.y)}`}</div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
