import React, { FC } from "react";
import { TriangleAlert } from "lucide-react";

export const RootErrorCard: FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return (
    <div className="flex transition-all items-center gap-2 justify-start text-red bg-red/20 border border-red p-3 py-4 rounded-xl">
      <TriangleAlert strokeWidth={1.4} size={30} />
      <p className="font-medium ">{errorMessage}</p>
    </div>
  );
};
