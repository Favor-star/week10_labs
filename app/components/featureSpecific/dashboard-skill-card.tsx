import { Skill } from "@/generated/prisma";
import { MoveRight, Trash, SquarePen } from "lucide-react";
import { FC } from "react";
import categoriesList from "@/data/categories";
import { cn } from "@/lib";
import Link from "next/link";

export const DashboardSkillCard: FC<{ data: Skill }> = ({ data }) => {
  const { id, progress, title, categoryId } = data;
  const category = categoriesList.filter((cat) => cat.id === categoryId)[0]
    .name;
  return (
    <div className=" w-full flex flex-col justify-center items-start p-5 rounded-xl gap-2 bg-secondary border border-secondary-l">
      <div className="w-full flex justify-between items-start">
        <div className=" flex-col gap-1 ">
          <p className="text-base font-bold w-full">{title}</p>
          <p className="text-secondary-xl text-sm">{category}</p>
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
        <span className={cn(`h-full bg-accent block w-[${progress}%]`)}></span>
      </div>
      <div className="w-full flex justify-between items-end mt-3">
        <Link
          href={`/vault/${id}`}
          className="p-2 rounded-lg bg-accent/30 border border-accent text-white text-sm flex items-center gap-2"
        >
          View SKill
          <MoveRight strokeWidth={1.3} />
        </Link>
        <span className="p-2 rounded-lg text-xs text-green bg-green/20">
          In Progress
        </span>
      </div>
    </div>
  );
};
