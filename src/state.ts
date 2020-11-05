import { atom, selector } from "recoil";
import {
  createDistribution,
  averageDistributions,
  composeDistributions
} from "./functions";
import gaussian from "gaussian";
import { sortBy } from "lodash";
import { simplifyDistribution } from "./functions";

export type Investment = {
  variance: string | number;
  mean: string | number;
};

export const DEFAULT: Investment = {
  variance: 200,
  mean: 5
};

export const investmentsAtom = atom({
  key: "investments",
  default: [DEFAULT]
});

export const initialInvestmentAtom = atom({
  key: "initial",
  default: 10
});

export const daysAtom = atom({
  key: "days",
  default: 10
});

const REINVEST = "Reinvest Gains/Losses";
const REINVEST_2X = "Reinvest Gains/Losses 2x Leverage";
const REINVEST_3X = "Reinvest Gains/Losses 3x Leverage";
const DONT_REINVEST = "Invest Initial Investment (Borrow If Neccessary)";
const DONT_REINVEST_NO_DEBT =
  "Invest Initial Investment (Borrow but Stop After Bankruptcy)";
const DONT_REINVEST_MORE = "Invest No More Than Initial Investment";
export const STRATEGY_OPTIONS = [
  REINVEST,
  REINVEST_2X,
  REINVEST_3X,
  DONT_REINVEST,
  DONT_REINVEST_NO_DEBT,
  DONT_REINVEST_MORE
];

export const investmentStrategyAtom = atom({
  key: "strategy",
  default: STRATEGY_OPTIONS[0]
});

const strategyFunc = selector({
  key: "strategyfunc",
  get: ({ get }) => {
    const initial = get(initialInvestmentAtom);
    const strategy = get(investmentStrategyAtom);
    switch (strategy) {
      case REINVEST:
        return (money: number, roi: number) => money + (money * roi) / 100;
      case REINVEST_2X:
        return (money: number, roi: number) => money + (money * 2 * roi) / 100;
      case REINVEST_3X:
        return (money: number, roi: number) => money + (money * 3 * roi) / 100;
      case DONT_REINVEST:
        return (money: number, roi: number) => money + (initial * roi) / 100;
      case DONT_REINVEST_NO_DEBT:
        return (money: number, roi: number) => {
          if (money <= 0) return money;
          return money + (initial * roi) / 100;
        };
      case DONT_REINVEST_MORE:
        return (money: number, roi: number) => {
          return money + (Math.min(initial, money) * roi) / 100;
        };
      default:
        throw Error("Unexpected");
    }
  }
});

export const simulationFunc = selector({
  key: "simulator",
  get: ({ get }) => {
    const investments = get(investmentsAtom);
    const initial = get(initialInvestmentAtom);
    const distributions = investments.map(investment => {
      return gaussian(+investment.mean, +investment.variance || 0.0000001);
    });
    const days = get(daysAtom);
    const func = get(strategyFunc);
    return () => {
      const money = distributions.map(() => initial / distributions.length);
      for (let i = 0; i < days; i += 1) {
        for (let j = 0; j < money.length; j += 1) {
          money[j] = func(money[j], distributions[j].ppf(Math.random()));
        }
        let s = 0;
        for (let i = 0; i < money.length; i += 1) {
          s += money[i];
        }
        for (let j = 0; j < money.length; j += 1) {
          money[j] = s / distributions.length;
        }
      }
      let s = 0;
      for (let i = 0; i < money.length; i += 1) {
        s += money[i];
      }
      return s;
    };
  }
});

export const moneyDistribution = selector({
  key: "result",
  get: ({ get }) => {
    const investments = get(investmentsAtom);
    const distributions = investments.map(investment => {
      return createDistribution(100, +investment.mean, +investment.variance);
    });
    const roi = averageDistributions(distributions);
    const initial = get(initialInvestmentAtom);
    const days = get(daysAtom);
    let money = createDistribution(100, initial, 0);
    const f = get(strategyFunc);
    for (let i = 0; i < days; i += 1) {
      money = composeDistributions(money, roi, f);
    }
    return money.map((n, i) => ({ x: i, y: n }));
    // const sim = get(simulationFunc);
    // let result: number[] = [];
    // for (let i = 0; i < 10000; i += 1) {
    //   result.push(sim());
    // }
    // result = sortBy(result, d => d);
    // const simplified = simplifyDistribution(result, 10000 / 100);
    // return simplified.map((n, i) => ({ x: i, y: n }));
  }
});
