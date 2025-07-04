import React from "react";

export const Select = () => {
  return (
    <form className="w-full">
      <label
        htmlFor={"categories"}
        className="flex items-center justify-between"
      >
        Select a cateogry
        <span className="text-xs text-red">{"error Message"}</span>
      </label>
      <select
        id="categories"
        className="bg-secondary-l border border-secondary-xl  rounded-lg p-3   block w-full"
      >
        <option selected>Choose a category</option>
        <option value="US">Backend Development</option>
        <option value="CA">Frontend development</option>
        <option value="FR">DevOps</option>
        <option value="DE">UI/UX</option>
      </select>
    </form>
  );
};
