import { FC } from "react";
import { Button } from "../ui/button";
import { Plus, MoveRight } from "lucide-react";
import { Reflection, Skill } from "@/generated/prisma";
import Link from "next/link";
import { ReflectionCard } from "../common/reflection-card";

export const SkillsReflectionCard: FC<{ data: Skill }> = ({ data }) => {
  const { id } = data;
  //@ts-expect-error
  const reflections: Reflection[] = data.reflections;
  return (
    <div className="w-full flex gap-3 p-3 flex-col items-center">
      <div className="w-full flex justify-between items-center py-2">
        <p className="text-xl  font-bold">Learning reflections</p>
        <Link href={`/vault/${id}/reflections`}>
          <Button>
            <Plus size={18} strokeWidth={1.4} />
            Add reflection
          </Button>
        </Link>
      </div>
      {reflections.length > 0 &&
        reflections.map((reflection) => (
          <ReflectionCard key={reflection.id} reflection={reflection} />
        ))}
      {reflections.length === 0 && (
        <p className="p-2 w-full text-start  text-white/70 italic">
          No reflections added yet
        </p>
      )}
      {reflections.length > 0 && (
        <Link href={`/vault/${id}/reflections`}>
          <Button>
            View More
            <MoveRight strokeWidth={1.4} />
          </Button>
        </Link>
      )}
    </div>
  );
};
