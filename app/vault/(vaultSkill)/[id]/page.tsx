import { SkillTitleCard } from "@/app/components/featureSpecific/skill-title-card";
import { SkillsContentTabs } from "@/app/components/featureSpecific/skills-content-tabs";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const cookieStore = await cookies();
  const res = await fetch(`${process.env.NEXT_URL}/api/skills/${id}`, {
    headers: {
      cookie: cookieStore.toString(),
    },
    cache: "force-cache",
  });
  if (!res.ok) notFound();
  const data = await res.json();

  return (
    <div className="mt-10 space-y-8">
      <SkillTitleCard data={data} />
      <SkillsContentTabs data={data} />
    </div>
  );
};

export default page;
