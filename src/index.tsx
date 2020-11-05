import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { InvestmentList } from "./investment-list";
import { Chart } from "./results";
import { Simulate } from "./Simulate";

const App = () => {
  return (
    <div>
      <div
        id="list"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 500,
          overflow: "auto",
          padding: 10
        }}
      >
        <InvestmentList />
      </div>
      <div
        id="results"
        style={{
          position: "absolute",
          left: 500,
          top: 0,
          bottom: 0,
          width: 500,
          overflow: "auto"
        }}
      >
        <Chart />
      </div>
      <div
        id="results"
        style={{
          position: "absolute",
          left: 1000,
          top: 0,
          bottom: 0,
          width: 500,
          overflow: "auto"
        }}
      >
        <Simulate />
      </div>
    </div>
  );
};

ReactDOM.render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.getElementById("root")
);
