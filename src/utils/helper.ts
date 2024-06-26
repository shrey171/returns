import { ChartDataset, Point } from "chart.js";

interface IGetDatasets {
  (data: {
    grossReturns: number[];
    netReturns: number[];
    invested: number[];
  })
    : ChartDataset<"line", (number | Point | null)[]>[]
}

export const getDatasets: IGetDatasets = ({ grossReturns, netReturns, invested }) => [
  {
    data: grossReturns,
    label: "Gross Returns",
    backgroundColor: "#f87171",
    borderColor: "#dc2626",
    fill: 1,
  },
  {
    data: netReturns,
    label: "Net Returns",
    fill: 2,
    backgroundColor: "#38bdf8",
    borderColor: "#0284c7",
    pointHitRadius: 5
  },
  {
    data: invested,
    label: "Invested",
    fill: "origin",
    backgroundColor: "rgb(134 239 172)",
    borderColor: "rgb(34 197 94)",
  },
];

export const getReturns = (
  base: number,
  rate: number,
  years: number,
  frequency: number
) => {
  const monthlyRate = rate / frequency / 100;
  const months = frequency * years;
  return (
    (base * (((1 + monthlyRate) ** months - 1) * (1 + monthlyRate))) /
    monthlyRate
  );
};