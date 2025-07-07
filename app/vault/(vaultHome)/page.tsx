import { Skill } from "@/generated/prisma";
import { cookies } from "next/headers";
import { DashboardSkillCard } from "@/app/components/featureSpecific/dashboard-skill-card";
import { DashboardSummaryCard } from "@/app/components/featureSpecific/dashboard-summary-card";
import { fetchWithErrorHandling } from "@/lib/error-handling";

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

  return (
    <section className="p-5">
      <div className="w-full grid gap-4 grid-cols-4">
        <DashboardSummaryCard />
        <DashboardSummaryCard />
        <DashboardSummaryCard />
        <DashboardSummaryCard />
      </div>
      <div className="grid w-full grid-cols-1  md:grid-cols-3 mt-10 gap-5">
        {data.map((skill) => (
          <DashboardSkillCard data={skill} key={skill.id} />
        ))}
      </div>
    </section>
  );
};

export default page;
