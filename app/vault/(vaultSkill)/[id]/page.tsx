import { SkillTitleCard } from "@/app/components/featureSpecific/skill-title-card";
import { SkillsContentTabs } from "@/app/components/featureSpecific/skills-content-tabs";

const page = () => {
  return (
    <div className="mt-10 space-y-8">
      <SkillTitleCard />
      <SkillsContentTabs />
    </div>
  );
};

export default page;
