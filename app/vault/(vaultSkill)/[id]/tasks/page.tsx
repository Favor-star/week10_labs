import { SkillSubtitleCard } from "@/app/components/featureSpecific/skills-subtittle-card";
import { TaskCard } from "@/app/components/featureSpecific/skills-tasks-card";
import { AddTaskForm } from "@/app/components/forms/add-task-form";
import React from "react";

const page = () => {
  return (
    <div className="mt-10 space-y-8">
      <SkillSubtitleCard />
      <div className="w-full  flex flex-col gap-3">
        <AddTaskForm />
        <div className="w-full"></div>
        <p className="text-xl  font-bold py-4">Recent tasks</p>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <TaskCard key={i} />
          ))}
      </div>
    </div>
  );
};

export default page;
