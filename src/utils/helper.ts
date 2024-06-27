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
    fill: 1,
    backgroundColor: "#FF7F50",
    pointHitRadius: 15,
  },
  {
    data: netReturns,
    label: "Net Returns",
    fill: 2,
    backgroundColor: "#007bff",
    pointHitRadius: 15
  },
  {
    data: invested,
    label: "Invested",
    fill: "origin",
    backgroundColor: "#D3D3D3",
    pointHitRadius: 15,
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