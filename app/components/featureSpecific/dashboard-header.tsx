import React from "react";
import { DashboardSearch } from "@/app/components/forms/dashboard-search";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const DashboardHeader = () => {
  return (
    <section className="w-full bg-secondary p-3 px-6 border-b text-white border-secondary-l flex items-center justify-between">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <p className="">Track your learning progress</p>
      </div>
      <div className="w-fit flex gap-2">
        <DashboardSearch />
        <Link href={"/vault/add-skill"}>
          <Button className="px-4 text-nowrap">
            <Plus size={20} />
            Add skill
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default DashboardHeader;
