import {
  ReflectionCard,
  SkillsReflectionCard,
} from "@/app/components/featureSpecific/skills-reflection-card";
import { SkillSubtitleCard } from "@/app/components/featureSpecific/skills-subtittle-card";
import { AddReflectionForm } from "@/app/components/forms/add-reflection-form";
import { Reflection, Skill } from "@/generated/prisma";
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
  const data: Skill = await res.json();
  //@ts-ignore
  const reflections: Reflection[] = data.reflections;
  return (
    <div className="mt-10 space-y-8">
      <SkillSubtitleCard
        title={data.title}
        startedAt={data.startedAt}
        progess={data.progress}
        id={data.id}
      />
      <div className="w-full  flex flex-col gap-3">
        <AddReflectionForm skillId={data.id} />
        <div className="w-full"></div>
        <p className="text-xl  font-bold py-4">Recent reflections</p>
        {reflections.length > 0 &&
          reflections.map((reflection) => (
            <ReflectionCard key={reflection.id} reflection={reflection} />
          ))}

        {reflections.length === 0 && (
          <p className="p-2 w-full text-start  text-white/70 italic">
            No reflections added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
