import { BrainCircuit, LogIn, UserPlus } from "lucide-react";
import { Button } from "./components/ui/button";
import Link from "next/link";
import { auth } from "@/auth";

export default async function Home() {
  const data = await auth();
  return (
    <section className="w-full px-4 min-h-screen flex flex-col gap-3 text-white items-center justify-center">
      <div className=""></div>
      <div className="mx-auto p-3 rounded-lg bg-accent w-fit h-fit">
        <BrainCircuit size={30} strokeWidth={1.3} />
      </div>
      <p className="text-4xl font-extrabold ">SkillVault</p>
      <p className="text-white/60 max-w-[400px] w-full text-center">
        Welcome to the SkillVault | your personal skills tracker
      </p>
      {!data && (
        <div className="flex gap-4 items-center justify-center">
          <Link href={"/register"}>
            <Button>
              <UserPlus strokeWidth={1.3} size={18} />
              Register
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button className="bg-transparent border border-accent text-accent hover:bg-accent hover:text-white transition-all">
              <LogIn strokeWidth={1.3} size={18} />
              Sign in
            </Button>
          </Link>
        </div>
      )}
      {data && (
        <Link href={"/vault"}>
          <Button className="mt-10">Go to dashboard</Button>
        </Link>
      )}
    </section>
  );
}
