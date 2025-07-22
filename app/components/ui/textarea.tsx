import { FC, TextareaHTMLAttributes } from "react";

interface TextareProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  placeholder: string;
  id: string;
  errorMessage?: string;
}
export const Textarea: FC<TextareProps> = ({
  label,
  placeholder,
  errorMessage,
  id,
  ...props
}) => {
  return (
    <fieldset className="flex flex-col gap-1 text-white w-full ">
      <label htmlFor="input" className="flex items-center justify-between">
        {label}
        <span className="text-xs text-red">{errorMessage}</span>
      </label>
      <textarea
        placeholder={placeholder}
        id={id}
        className="p-3 rounded-lg bg-secondary-l border border-secondary-xl "
        {...props}
      />
    </fieldset>
  );
};
