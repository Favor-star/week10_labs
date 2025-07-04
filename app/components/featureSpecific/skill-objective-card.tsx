import { Skill } from "@/generated/prisma";
import { CheckCircle2, Circle, Info, Lightbulb, ListCheck } from "lucide-react";
import { FC } from "react";
export const SkillObjectiveCard: FC<{ data: Skill }> = ({ data }) => {
  const { objectives } = data;
  return (
    <div className="w-full flex flex-col md:flex-row p-3 gap-8 justify-between">
      <div className=" space-y-3 w-full">
        <h3 className="font-bold text-xl">Learning objectives</h3>
        {objectives.map((obj) => (
          <p className="space-x-3 flex " key={obj.split(" ")[1]}>
            <CheckCircle2 strokeWidth={1.3} className="text-green" />
            <span>{obj}</span>
          </p>
        ))}
      </div>
      <div className="w-full max-w-4/12 space-y-3">
        <h3 className="font-bold text-xl">Progress</h3>
        <div className="h-3 w-full rounded-full overflow-hidden bg-secondary-l mt-3">
          <span className="w-1/2 h-full bg-accent block"></span>
        </div>
        <p className="text-white/70 text-sm">65% complete</p>
        <p className="flex items-center justify-between">
          <span className="text-sm">Task completed</span>
          <span className="font-medium">10/12</span>
        </p>
        <p className="flex items-center justify-between">
          <span className="text-sm">Reflections</span>
          <span className="font-medium">10</span>
        </p>
      </div>
    </div>
  );
};
