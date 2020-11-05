import React from "react";
import { atom, useRecoilState } from "recoil";
import Slider from "@material-ui/core/Slider";
import { cloneDeep } from "lodash";
import { Paper, Select, MenuItem } from "@material-ui/core";
import { daysAtom, initialInvestmentAtom } from "./state";
import {
  investmentsAtom,
  DEFAULT,
  investmentStrategyAtom,
  STRATEGY_OPTIONS
} from "./state";

export const InvestmentList = React.memo(() => {
  const [investments, setInvestments] = useRecoilState(investmentsAtom);
  const [strategy, setStrategy] = useRecoilState(investmentStrategyAtom);
  const [days, setDays] = useRecoilState(daysAtom);
  const [initialInvestment, setInitialInvestment] = useRecoilState(
    initialInvestmentAtom
  );
  const editMean = (index: number, val: number | string) => {
    const clone = cloneDeep(investments);
    clone[index].mean = val;
    setInvestments(clone);
  };
  const editVariance = (index: number, val: number | string) => {
    const clone = cloneDeep(investments);
    clone[index].variance = val;
    setInvestments(clone);
  };
  const deleteInvestment = (index: number) => {
    const clone = investments.filter((d, i) => i !== index);
    setInvestments(clone);
  };
  const addInvestment = () => {
    const clone = [...investments, { ...DEFAULT }];
    setInvestments(clone);
  };
  return (
    <div>
      <h2>Settings</h2>
      <div>Strategy:</div>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={strategy}
        onChange={e => setStrategy(String(e.target.value))}
      >
        {STRATEGY_OPTIONS.map(option => {
          return <MenuItem value={option}>{option}</MenuItem>;
        })}
      </Select>
      <div>Days:</div>
      <Slider
        value={Number(days)}
        onChange={(e, val) => setDays(Number(val))}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />
      <div>Initial Investment ($):</div>
      <Slider
        value={Number(initialInvestment)}
        onChange={(e, val) => setInitialInvestment(Number(val))}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        min={0}
        max={100}
      />
      {investments.map((investment, index) => {
        return (
          <Paper
            elevation={5}
            style={{
              margin: 10,
              padding: 0,
              width: "calc(100% - 20px)",
              height: 220
            }}
          >
            <div style={{ margin: 10 }}>
              <h4>{`Investment ${index + 1}`}</h4>
              <div>Mean:</div>

              <Slider
                value={Number(investment.mean)}
                onChange={(e, val) => editMean(index, Number(val))}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                min={0}
                max={20}
              />
              <input
                value={investment.mean}
                onChange={e => editMean(index, e.target.value)}
                type="number"
              ></input>
              <div>Variance:</div>

              <Slider
                value={Number(investment.variance)}
                onChange={(e, val) => editVariance(index, Number(val))}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                min={0}
                max={2000}
              />
              <input
                value={investment.variance}
                onChange={e => editVariance(index, e.target.value)}
                type="number"
              ></input>
              <div>
                <button onClick={() => deleteInvestment(index)}>
                  Delete This Investment
                </button>
              </div>
            </div>
          </Paper>
        );
      })}
      <button onClick={() => addInvestment()}>Add New Investment</button>
    </div>
  );
});
