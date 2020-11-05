import gaussian from "gaussian";
import { sortBy } from "lodash";

export function createDistribution(size: number, mean = 0, variance = 1) {
  const L: number[] = [];
  if (variance <= 0) {
    for (let i = 0; i < size; i += 1) {
      L.push(mean);
    }
    return L;
  }
  const distribution = gaussian(mean, variance);

  const inc = 1 / size;
  for (let prob = inc * 0.5; prob < 1; prob += inc) {
    L.push(distribution.ppf(prob));
  }
  return L;
}

export function simplifyDistribution(L: number[], size = 100) {
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

export function composeDistributions(
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
  const shrunk: number[] = simplifyDistribution(list, size);
  return shrunk;
}

export function averageDistributions(distributions: number[][]) {
  if (distributions.length === 0) return [];
  let result = distributions[0];
  for (let i = 1; i < distributions.length; i += 1) {
    let weight = 1 / (i + 1);
    result = composeDistributions(
      result,
      distributions[i],
      (a, b) => a * weight + b * (1 - weight)
    );
  }
  return result;
}
