"use client";
import {
  ChartLine,
  User,
  Plus,
  Settings,
  BrainCircuit,
  User2,
  LogOut,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { SignOutWrapper } from "./signout-wrapper";

export const DashboardSidebar = () => {
  const pathname = usePathname();
  const { data } = useSession();
  return (
    <aside className="  w-72 h-screen p-4 flex flex-col  bg-secondary border-e border-secondary-l space-y-16 text-white">
      <div className="w-full h-fit space-x-3 flex items-center justify-start ">
        <div className="p-3 bg-accent inline-block rounded-xl w-fit aspect-square ">
          <BrainCircuit size={24} strokeWidth={1.3} />
        </div>
        <h2 className="text-2xl font-bold inline">SkillVault</h2>
      </div>
      <div className="h-fit w-full  flex flex-col gap-5 font-medium items-start ">
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
      <div className="w-full h-full flex-1 items-start justify-end flex flex-col gap-3  p-2">
        <div className="space-x-1 w-full flex items-center gap-2">
          <User2
            size={40}
            strokeWidth={1.4}
            className="rounded-full bg-secondary border aspect-square"
          />

          <p className="font-bold text-xs">{data && data.user?.name}</p>
        </div>
        <SignOutWrapper>
          <Button className="bg-red/20 text-red w-full py-2">
            <LogOut size={18} strokeWidth={1.3} />
            Logout
          </Button>
        </SignOutWrapper>
      </div>
    </aside>
  );
};

const links = [
  {
    label: "Dashboard",
    href: "/vault",
    icon: ChartLine,
  },
  {
    label: "Add Skill",
    href: "/vault/add-skill",
    icon: Plus,
  },
  {
    label: "Profile",
    href: "/vault/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/vault/settings",
    icon: Settings,
  },
];
