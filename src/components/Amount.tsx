import { twMerge } from "tailwind-merge";

interface IProps {
  amount: number;
  label: string;
  invested: number;
  showRatio?: boolean;
  className?: string;
}

export const Amount = ({
  amount,
  label,
  invested,
  showRatio,
  className,
}: IProps) => {
  const formatter = (num: number, max?: number) =>
    new Intl.NumberFormat("en-US", {
      maximumSignificantDigits: max,
    }).format(num);
  const percent = formatter(amount / invested || 0, 3);
  const formattedAmount = formatter(amount);
  const classes = twMerge(
    "w-full text-accent flex justify-between gap-4",
    className
  );

  return (
    <div className={classes}>
      <p className="font-medium uppercase">{label}</p>
      <div className="grid grid-cols-[1fr_100px] font-mono text-end md:gap-4 lg:text-lg">
        <p>{formattedAmount}</p>
        <p className="lg:text-start">{showRatio ? `(${percent}x)` : ""}</p>
      </div>
    </div>
  );
};
