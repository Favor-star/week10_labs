import {
  ReflectionCard,
  SkillsReflectionCard,
} from "@/app/components/featureSpecific/skills-reflection-card";
import { SkillSubtitleCard } from "@/app/components/featureSpecific/skills-subtittle-card";
import { AddReflectionForm } from "@/app/components/forms/add-reflection-form";
import React from "react";

const page = () => {
  return (
    <div className="mt-10 space-y-8">
      <SkillSubtitleCard />
      <div className="w-full  flex flex-col gap-3">
        <AddReflectionForm />
        <div className="w-full"></div>
        <p className="text-xl  font-bold py-4">Recent reflections</p>
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <ReflectionCard key={i} />
          ))}
      </div>
    </div>
  );
};

export default page;
