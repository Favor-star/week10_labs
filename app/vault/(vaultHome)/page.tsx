import { Skill, Task } from "@/generated/prisma";
import { cookies } from "next/headers";
import { DashboardSkillCard } from "@/app/components/featureSpecific/dashboard-skill-card";
import { DashboardSummaryCard } from "@/app/components/featureSpecific/dashboard-summary-card";
import { fetchWithErrorHandling } from "@/lib/error-handling";
import { SKillAddCard } from "@/app/components/featureSpecific/dashboard-add-skill-card";
import Link from "next/link";
import { Book, CheckCircle, Clock, ListChecks } from "lucide-react";

const page = async () => {
  const cookieStore = await cookies();
  const res = await fetchWithErrorHandling(
    `${process.env.NEXT_URL}/api/skills`,
    {
      headers: {
        cookie: cookieStore.toString(),
      },
      cache: "force-cache",
    }
  );
  const data: Skill[] = await res.json();

  //@ts-expect-error
  const tasks: Task[] = data.flatMap((data) => data.task);
  const completedTasks = tasks.filter(({ isDone }) => isDone);
  const startedSkills = data.filter(({ hasStarted }) => hasStarted);
  return (
    <section className="p-5">
      <div className="w-full grid gap-4  grid-cols-2 sm:grid-cols-2 md:grid-cols-4">
        <DashboardSummaryCard
          label="Total skills"
          icon={Book}
          info={data.length}
          color="#c084fc"
        />
        <DashboardSummaryCard
          label="Completed"
          icon={CheckCircle}
          info={completedTasks.length}
          color="#16a34a"
        />
        <DashboardSummaryCard
          label="In progress"
          icon={Clock}
          info={startedSkills.length}
          color="#f87171"
        />
        <DashboardSummaryCard
          label="Total tasks"
          icon={ListChecks}
          info={tasks.length}
          color="#ca8a04"
        />

        {/* <DashboardSummaryCard />
        <DashboardSummaryCard />
        <DashboardSummaryCard /> */}
      </div>
      <div className="grid w-full grid-cols-1  md:grid-cols-3 mt-10 gap-5">
        {data.map((skill) => (
          <DashboardSkillCard data={skill} key={skill.id} />
        ))}
        <Link href={"/vault/add-skill"}>
          <SKillAddCard />
        </Link>
      </div>
    </section>
  );
};

export default page;
