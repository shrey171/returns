import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Point,
  ChartDataset,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface IProps {
  className?: string;
  datasets: ChartDataset<"line", (number | Point | null)[]>[];
  labels: string[];
}

export const Chart = ({ datasets, labels, className }: IProps) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        suggestedMin: 0 
      }
    }
  };

  const data = { labels, datasets };

  return <Line className={className} data={data} options={options} />;
};
