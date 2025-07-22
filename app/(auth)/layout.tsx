import { BrainCircuit } from "lucide-react";
import { ReactNode } from "react";
import { Providers } from "../providers/Providers";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="w-full max-w-[450px] mx-auto flex flex-col gap-5 items-center justify-center px-4 text-white my-10">
      <div className="aspect-square p-4 rounded-xl bg-accent ">
        <BrainCircuit size={30} strokeWidth={1.3} />
      </div>
      <h1 className="font-extrabold text-4xl">SkillVault</h1>
      <p className="text-white/50">Track your learning journey</p>
      <Providers>{children}</Providers>
    </section>
  );
};
export default layout;
