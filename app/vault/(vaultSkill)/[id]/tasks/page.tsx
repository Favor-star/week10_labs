import { SkillSubtitleCard } from "@/app/components/featureSpecific/skills-subtittle-card";
import { TaskCard } from "@/app/components/common/task-card";
import { AddTaskForm } from "@/app/components/forms/add-task-form";
import { Skill, Task } from "@/generated/prisma";
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
  const task: Task[] = await data.task;

  return (
    <div className="mt-10 space-y-8">
      <SkillSubtitleCard
        id={data.id}
        title={data.title}
        startedAt={data.startedAt}
        progess={data.progress}
      />
      <div className="w-full  flex flex-col gap-3">
        <AddTaskForm skillId={data.id} />
        <div className="w-full"></div>
        <p className="text-xl  font-bold py-4">Recent tasks</p>
        {task.length > 0 &&
          task.map((el) => <TaskCard key={el.id} task={el} />)}
        {task.length === 0 && (
          <p className="p-2 w-full text-start  text-white/70 italic">
            No tasks added yet
          </p>
        )}
      </div>
    </div>
  );
};

export default page;
