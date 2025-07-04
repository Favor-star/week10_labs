import { Menu, User } from "lucide-react";
import Link from "next/link";
import React from "react";

export const VaultNavbar = () => {
  return (
    <section className="w-full bg-secondary  border-b border-secondary-l">
      <header className="w-full mx-auto flex justify-between items-center max-w-screen-xl py-5 px-4 bg-secondary text-white">
        <div className="flex gap-3 items-center md:hidden">
          <button className="p-2 border border-white/70 rounded-lg">
            <Menu size={20} className="text-white/70" />
          </button>
          <Link href={"/"} className="text-accent  font-bold text-2xl ">
            SkillVault
          </Link>
        </div>
        <nav className="items-center hidden md:flex">
          <ul className="gap-6 flex flex-row items-center">
            <li className="text-accent font-bold text-3xl">
              <Link href={"/"}>SkillVault</Link>
            </li>
            <li className="text-lg">
              <Link href={"/vault"}>SKills</Link>
            </li>
            <li className="text-lg">
              <Link href={"/vault"}>Progress</Link>
            </li>
            <li className="text-lg">
              <Link href={"/vault"}>Analytics</Link>
            </li>
          </ul>
        </nav>
        <User
          size={40}
          strokeWidth={1.3}
          className="rounded-full bg-secondary-l border border-secondary-xl "
        />
      </header>
    </section>
  );
};
