import { SkillTitleCard } from "../components/featureSpecific/skill-title-card";
import { SkillObjectiveCard } from "../components/featureSpecific/skill-objective-card";
import { SkillsTasksCard } from "../components/featureSpecific/skills-tasks-card";
import { ListCheck, Lightbulb, Info } from "lucide-react";
import { SkillsReflectionCard } from "../components/featureSpecific/skills-reflection-card";

const page = () => {
  return (
    <div className="mt-10 space-y-8">
      <SkillTitleCard />
      <section className=" rounded-xl bg-secondary border border-secondary-l ">
        <div className="w-full  border-b px-3 flex gap-3 items-center border-secondary-l">
          <div className="w-fit flex items-center gap-2 px-3 py-4 border-b-2 border-accent">
            <Info size={20} strokeWidth={1.3} className="hidden md:block" />
            <p className="text-base  inline-block">Overview</p>
          </div>
          <div className="w-fit flex items-center gap-2 px-3 py-4  ">
            <ListCheck
              size={20}
              strokeWidth={1.3}
              className="hidden md:block"
            />
            <p className="text-base  inline-block">Task</p>
          </div>
          <div className="w-fit flex items-center gap-2 px-3 py-4 ">
            <Lightbulb
              size={20}
              strokeWidth={1.3}
              className="hidden md:block"
            />
            <p className="text-base  inline-block">Reflection</p>
          </div>
        </div>
        <div className="w-full p-2">
          {/* <SkillsTasksCard /> */}
          <SkillsReflectionCard />
          {/* <SkillObjectiveCard /> */}
        </div>
      </section>
    </div>
  );
};

export default page;
