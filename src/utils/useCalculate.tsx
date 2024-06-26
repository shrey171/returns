import { ChartDataset, Point } from "chart.js";
import { useState } from "react";
import { ISchema } from "./schema";
import { getDatasets, getReturns } from "./helper";

interface IUseCalculate {
  (): {
    calculate: (schema: ISchema) => void;
    values: {
      netProfit: number;
      invested: number;
      grossProfit: number;
      lostToInflation: number;
    };
    labels: string[];
    datasets: ChartDataset<"line", (number | Point | null)[]>[];
  };
}

interface IDataValues {
  invested: number[];
  grossReturns: number[];
  netReturns: number[];
}

export const useCalculate: IUseCalculate = () => {
  const [data, setData] = useState<IDataValues>({
    invested: [],
    grossReturns: [],
    netReturns: [],
  });
  const [labels, setLabels] = useState<string[]>([]);

  const finalIdx = data.netReturns.length - 1;
  const values = {
    netProfit: 0,
    invested: 0,
    grossProfit: 0,
    lostToInflation: 0,
  };

  if (finalIdx >= 0) {
    values.netProfit = Math.trunc(Number(data.netReturns[finalIdx]));
    values.invested = Math.trunc(Number(data.invested[finalIdx]));
    values.grossProfit = Math.trunc(Number(data.grossReturns[finalIdx]));
    values.lostToInflation = Math.trunc(
      Number(values.grossProfit - values.netProfit)
    );
  }

  const calculate = ({
    rate,
    years = 1,
    increment = 0,
    inflation,
    mode,
  }: ISchema) => {
    const year = new Date().getFullYear() + 1;
    const frequency = mode === "annual" ? 1 : 12;
    const yearlyIncrement = increment * frequency;
    let investements = 0;
    const results: IDataValues = {
      invested: [],
      grossReturns: [],
      netReturns: [],
    };

    for (let i = 1; i <= years; i++) {
      const newGross = getReturns(increment, rate, i, frequency);
      const newNet = getReturns(increment, rate - inflation, i, frequency);
      investements += yearlyIncrement;

      results.grossReturns.push(newGross);
      results.netReturns.push(newNet);
      results.invested.push(investements);
    }

    setData(results);
    setLabels(Array.from({ length: years }, (_, i) => `${year + i}`));
  };

  const datasets = getDatasets(data);
  return { calculate, values, labels, datasets };
};
