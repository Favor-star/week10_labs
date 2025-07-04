import React from "react";
import { Button } from "../ui/button";
import { MoveLeft, SquarePen, Trash } from "lucide-react";

export const SkillSubtitleCard = () => {
  return (
    <div className="p-5 rounded-xl bg-secondary border border-secondary-l flex flex-col gap-4">
      <div className="flex md:flex-row flex-col gap-3 justify-between items-center">
        <p className="w-full font-extrabold text-2xl md:text-2xl flex flex-col gap-1 md:flex-row items-start md:items-end ">
          Reflections <span className="hidden md:block font-normal"> | </span>
          <span className="text-xl font-light">ReactJS Development</span>
        </p>
        <div className="flex gap-3">
          {/* <Button className="">
            <SquarePen strokeWidth={1.5} />
            Edit
          </Button> */}
          <Button className=" inline-flex text-white text-nowrap bg-white/20 ">
            <MoveLeft strokeWidth={1.5} />
            Back to Skill
          </Button>
        </div>
      </div>
      <div className="w-full space-x-3 md:space-x-20">
        <div className="inline-block p-2 text-sm md:text-base bg-green/20 text-green rounded-lg space-x-2">
          <span className="aspect-square w-3 h-3 rounded-full bg-green inline-block"></span>
          <p className="inline-block">In progress</p>
        </div>
        <p className="inline-block mt-2 text-secondary-xxl">
          <span>Started: </span>
          <span>March 15, 2025 </span>
        </p>
      </div>
    </div>
  );
};
