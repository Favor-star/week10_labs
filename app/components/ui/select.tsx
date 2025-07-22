import { CategoriesProps } from "@/data/categories";
import { FC, SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
  optionsList: CategoriesProps[];
}
export const Select: FC<SelectProps> = ({
  errorMessage,
  optionsList,
  ...props
}) => {
  return (
    <div className="w-full">
      <label
        htmlFor={"categories"}
        className="flex items-center justify-between"
      >
        Please choose
        <span className="text-xs text-red">{errorMessage}</span>
      </label>
      <select
        id="categories"
        className="bg-secondary-l border border-secondary-xl  rounded-lg p-3   block w-full"
        defaultValue={""}
        {...props}
      >
        <option value={""}>Choose</option>
        {optionsList.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
