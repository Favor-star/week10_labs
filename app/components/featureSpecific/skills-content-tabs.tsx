"use client";
import React, { createElement, useState } from "react";
import { SkillObjectiveCard } from "@/app/components/featureSpecific/skill-objective-card";
import { SkillsTasksCard } from "@/app/components/featureSpecific/skills-tasks-card";
import { ListCheck, Lightbulb, Info } from "lucide-react";
import { SkillsReflectionCard } from "@/app/components/featureSpecific/skills-reflection-card";
import { cn } from "@/lib";

export const SkillsContentTabs = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  return (
    <section className=" rounded-xl bg-secondary border border-secondary-l ">
      <div className="w-full  border-b px-3 flex gap-3 items-center border-secondary-l">
        {tabs.map(({ icon: Icon, label }, i) => (
          <button
            className={cn(
              "w-fit flex items-center gap-2 px-3 py-4 border-b-2 border-secondary ",
              activeTabIndex === i &&
                " border-b-2 border-accent text-accent transition-all"
            )}
            onClick={() => setActiveTabIndex(i)}
            key={label}
          >
            <Icon size={20} strokeWidth={1.3} className="hidden md:block" />
            <span className="text-base  inline-block">{label}</span>
          </button>
        ))}
      </div>
      {createElement(tabsCard[activeTabIndex])}
      {/* <div className="w-full p-2"></div> */}
    </section>
  );
};
const tabs = [
  { label: "Overview", icon: Info },
  { label: "Tasks", icon: ListCheck },
  { label: "Reflections", icon: Lightbulb },
];
const tabsCard = [SkillObjectiveCard, SkillsTasksCard, SkillsReflectionCard];
