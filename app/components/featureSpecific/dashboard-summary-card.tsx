import { Book } from "lucide-react";
export const DashboardSummaryCard = () => {
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
