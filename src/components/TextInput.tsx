import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const TextInput = forwardRef<HTMLInputElement, IProps>(
  ({ className, name, label, error, ...props }, ref) => {
    const labelClasses = twMerge("capitalize", error && "text-error");
    const inputClasses = twMerge(
      "border-2 outline-none rounded-lg w-full mt-1 px-4 py-3 transition-colors duration-200 focus:border-accent",
      error && "border-error text-error"
    );

    return (
      <div className={className}>
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
