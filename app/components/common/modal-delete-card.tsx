import React from "react";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

export const ModalDelete = () => {
  return (
    <div className="w-full max-w-[500px] bg-secondary text-white p-3 rounded-xl border border-secondary-xl space-y-4">
      <h3 className="font-bold text-2xl">Are you sure?</h3>
      <p className="">
        This action is irrevasible. You will loose access to this content.
      </p>
      <div className="flex gap-5 mt-5  justify-end  items-start ">
        <Button className="text-white/70 bg-transparent border border-white/70">
          Cancel
        </Button>
        <Button className="text-white bg-red">
          <Trash />
          Delete
        </Button>
      </div>
    </div>
  );
};
