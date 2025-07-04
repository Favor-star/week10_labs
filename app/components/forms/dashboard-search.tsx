import { Search } from "lucide-react";
import React from "react";

export const DashboardSearch = () => {
  return (
    <form className="bg-secondary-l border border-secondary-xl rounded-lg flex items-center w-full max-w-[500px] justify-center">
      <Search strokeWidth={1.3} className="w-8 h-8 mx-2 text-secondary-xxl" />
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Search skill"
        className="w-full p-2 autofill:bg-secondary bg-secondary-l text-white placeholder:text-white/50 focus-within:outline-0"
      />
    </form>
  );
};
