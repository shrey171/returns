import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  array: string[];
  className?: string;
}

export const DropDown = forwardRef<HTMLSelectElement, IProps>(
  ({ array, name, error, className, label, ...props }, ref) => {

    const labelClasses = twMerge("capitalize text-lg", error && "text-error");    
    const inputClasses = twMerge(
      "border-2 bg-white outline-none capitalize rounded-lg w-full px-4 py-3 mt-1 transition-colors duration-200 focus:border-accent",
      error && "border-error text-error"
    );

    return (
      <div className={className}>
        <label className={labelClasses} htmlFor={name}>
          {label || name}
        </label>
        <select
          className={inputClasses}
          ref={ref}
          name={name}
          id={name}
          {...props}>
          {array.map((item, index) => (
            <option className="text-zinc-900" key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
