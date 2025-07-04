import { MoveRight, Plus, Square, SquarePen, Trash } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

export const SkillsTasksCard = () => {
  return (
    <div className="w-full flex gap-3 flex-col items-center">
      <div className="w-full flex justify-between items-center py-2">
        <p className="text-xl  font-bold">Tasks</p>
        <Button>
          <Plus size={18} strokeWidth={1.4} />
          Add a task
        </Button>
      </div>
      {Array(4)
        .fill("")
        .map((_, i) => (
          <TaskCard key={i} />
        ))}
      <Button>
        View More
        <MoveRight strokeWidth={1.4} />
      </Button>
    </div>
  );
};

const TaskCard = () => {
  return (
    <div className="w-full flex justify-between gap-2 items-center py-2 px-3 border  border-secondary-xl rounded-xl">
      <div className="flex items-center gap-2">
        {/* <input type="checkbox" name="skillDone" id="skillDone" /> */}
        <Square size={20} strokeWidth={1.6} />
        <div className="">
          <h2 className="font-bold text-base">
            Learning about closures and really long stuff and much more
          </h2>
          <p className="text-white/60 font-light text-sm">
            Due: <span>Dec 20, 2025</span>
          </p>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <button className="text-white/70 p-2">
          <SquarePen size={20} strokeWidth={1.3} />
        </button>
        <button className="text-red">
          <Trash size={20} strokeWidth={1.3} />
        </button>
      </div>
    </div>
  );
};
