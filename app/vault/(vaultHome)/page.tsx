import { Book, MoveLeft, MoveRight, SquarePen, Trash } from "lucide-react";
import React from "react";

const page = () => {
  return (
    <section className="p-5">
      <div className="w-full grid gap-4 grid-cols-4">
        <DashboardSummaryCard />
        <DashboardSummaryCard />
        <DashboardSummaryCard />
        <DashboardSummaryCard />
      </div>
      <div className="grid w-full grid-cols-3 mt-10 gap-5">
        <DashboardSkillCard />
        <DashboardSkillCard />
        <DashboardSkillCard />
      </div>
    </section>
  );
};

export default page;

const DashboardSummaryCard = () => {
  return (
    <div className=" w-full flex flex-row justify-between p-5 rounded-xl bg-secondary border border-secondary-l">
      <p className="flex flex-col">
        <span className="text-secondary-xl text-base">Total skills</span>
        <span className="text-white text-xl font-bold">90</span>
      </p>
      <div className="aspect-square p-3 w-fit h-fit rounded-lg bg-pink/30">
        <Book className="text-pink" size={24} />
      </div>
    </div>
  );
};
const DashboardSkillCard = () => {
  return (
    <div className=" w-full flex flex-col justify-center items-start p-5 rounded-xl gap-2 bg-secondary border border-secondary-l">
      <div className="w-full flex justify-between items-start">
        <div className="w-full flex-col gap-1 ">
          <p className="text-base font-bold">React Advanced</p>
          <p className="text-secondary-xl text-sm">Fronted Development</p>
        </div>
        <div className="flex gap-2 items-center">
          <Trash strokeWidth={1.3} size={20} />
          <SquarePen size={20} strokeWidth={1.3} />
        </div>
      </div>
      <p className="w-full flex justify-between">
        <span>Progress</span>
        <span>7/10 tasks</span>
      </p>
      <div className="h-3 w-full rounded-full overflow-hidden bg-secondary-l">
        <span className="w-1/2 h-full bg-accent block"></span>
      </div>
      <div className="w-full flex justify-between items-end mt-3">
        <button className="p-2 rounded-lg bg-accent/30 border border-accent text-white text-sm flex items-center gap-2">
          View SKill
          <MoveRight strokeWidth={1.3} />
        </button>
        <span className="p-2 rounded-lg text-xs text-green bg-green/20">
          In Progress
        </span>
      </div>
    </div>
  );
};
