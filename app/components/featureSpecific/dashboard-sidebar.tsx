"use client";
import { ChartLine, User, Plus, Settings, BrainCircuit } from "lucide-react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib";
import { usePathname } from "next/navigation";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <aside className=" md:relative w-72 h-screen p-4  bg-secondary border-e border-secondary-l space-y-16 text-white">
      <div className="w-full space-x-3 flex items-center justify-start ">
        <div className="p-3 bg-accent inline-block rounded-xl w-fit aspect-square ">
          <BrainCircuit size={24} strokeWidth={1.3} />
        </div>
        <h2 className="text-2xl font-bold inline">SkillVault</h2>
      </div>
      <div className=" w-full  flex flex-col gap-5 font-medium items-start ">
        {links.map(({ icon: Icon, label, href }) => (
          <Link
            href={href}
            key={label}
            className={cn(
              "flex gap-2 items-center text-lg hover:bg-accent/50 p-3 rounded-xl w-full transition-all",
              pathname === href && "bg-accent"
            )}
          >
            <Icon size={24} />
            {label}
          </Link>
        ))}
      </div>
    </aside>
  );
};

const links = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: ChartLine,
  },
  {
    label: "Add Skill",
    href: "/dashboard/add-skill",
    icon: Plus,
  },
  {
    label: "Profile",
    href: "/dashboard/Profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];
