import React, { ButtonHTMLAttributes, FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type?: string;
  placeholder: string;
  id: string;
  errorMessage?: string;
}
export const Input: FC<InputProps> = ({
  label,
  placeholder,
  errorMessage,
  id,
  type = "text",
  ...props
}) => {
  return (
    <fieldset className="flex flex-col gap-1 text-white w-full ">
      <label htmlFor="input" className="flex items-center justify-between">
        {label}
        <span className="text-xs text-red">{errorMessage}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className="p-3 rounded-lg bg-secondary-l border border-secondary-xl "
        {...props}
      />
    </fieldset>
  );
};
