import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, IProps>(
  ({ className, name, label, error, ...props }, ref) => {
    const inputClasses = twMerge(
      "border-2 text-zinc-700 outline-none rounded-lg w-full mt-1 px-4 py-3 peer transition-colors duration-200 focus:border-green-400",
      error && "border-error text-error"
    );

    const labelClasses = twMerge(
      "capitalize text-zinc-800 group-focus-within:text-green-500",
      error && "text-error"
    );

    return (
      <div className={twMerge("group", className)}>
        <label htmlFor={name} className={labelClasses}>
          {label || name}
        </label>
        <input
          className={inputClasses}
          name={name}
          id={name}
          ref={ref}
          {...props}
        />
        <p className="text-error text-sm">{error}</p>
      </div>
    );
  }
);
