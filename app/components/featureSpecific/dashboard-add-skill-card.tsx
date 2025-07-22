import { Plus } from "lucide-react";
import React from "react";

export const SKillAddCard = () => {
  return (
    <div className="w-full flex flex-col gap-3 items-center border-dashed border-2 bg-secondary border-secondary-l p-4 py-5 rounded-xl">
      <div className="p-3 rounded-full w-fit bg-accent/20 text-accent">
        <Plus size={40} />
      </div>
      <p className="font-bold text-lg">Add new skill</p>
      <p className="text-sm">Start tracking a new learning goal</p>
    </div>
  );
};
