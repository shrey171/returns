import { ChartDataset, Point } from "chart.js";
import { useState } from "react";
import { ISchema } from "./schema";
import { getDatasets, getReturns } from "./helper";

interface IValues {
  netProfit: number;
  invested: number;
  grossProfit: number;
  lostToInflation: number;
}

interface IDataState {
  invested: number[];
  grossReturns: number[];
  netReturns: number[];
}

interface IUseCalculate {
  (): {
    calculate: (schema: ISchema) => void;
    values: IValues;
    labels: string[];
    datasets: ChartDataset<"line", (number | Point | null)[]>[];
  };
}

export const useCalculate: IUseCalculate = () => {
  const initialData: IDataState = {
    invested: [],
    grossReturns: [],
    netReturns: [],
  };
  const initialValues: IValues = {
    netProfit: 0,
    invested: 0,
    grossProfit: 0,
    lostToInflation: 0,
  };
  const [data, setData] = useState<IDataState>(initialData);
  const [labels, setLabels] = useState<string[]>([]);

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
    const results: IDataState = { ...initialData };
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
  const idx = data.netReturns.length - 1;
  const values: IValues = { ...initialValues };
  const setValue = (key: keyof typeof values, value: number) => {
    values[key] = Math.trunc(value);
  };

  setValue("netProfit", data.netReturns[idx]);
  setValue("invested", data.invested[idx]);
  setValue("grossProfit", data.grossReturns[idx]);
  setValue("lostToInflation", data.grossReturns[idx] - data.netReturns[idx]);

  return { calculate, values, labels, datasets };
};
