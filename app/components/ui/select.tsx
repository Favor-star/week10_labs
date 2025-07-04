import { CategoriesProps } from "@/data/categories";
import { FC, SelectHTMLAttributes } from "react";
import optionList from "@/data/categories";
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  errorMessage?: string;
}
export const Select: FC<SelectProps> = ({ errorMessage, ...props }) => {
  return (
    <div className="w-full">
      <label
        htmlFor={"categories"}
        className="flex items-center justify-between"
      >
        Select a cateogry
        <span className="text-xs text-red">{errorMessage}</span>
      </label>
      <select
        id="categories"
        className="bg-secondary-l border border-secondary-xl  rounded-lg p-3   block w-full"
        defaultValue={""}
        {...props}
      >
        <option value={""}>Choose a category</option>
        {optionList.map(({ id, name }) => (
          <option key={id} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};
