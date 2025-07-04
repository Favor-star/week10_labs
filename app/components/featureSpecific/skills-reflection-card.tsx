import { FC } from "react";
import { Button } from "../ui/button";
import { Plus, MoveRight, SquarePen, Trash } from "lucide-react";
import { Reflection, Skill } from "@/generated/prisma";
import Link from "next/link";
export const SkillsReflectionCard: FC<{ data: Skill }> = ({ data }) => {
  const { id } = data;
  //@ts-ignore
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

export const ReflectionCard = ({ reflection }: { reflection: Reflection }) => {
  return (
    <div className="w-full flex flex-col justify-center gap-2  py-2 px-3 border  border-secondary-xl rounded-xl">
      <div className="flex items-center justify-between gap-2">
        <div className="space-x-2">
          <p className="font-bold text-base inline-block">{reflection.mood}</p>
          <p className="text-white/60 font-light text-sm inline-block">
            {new Date(reflection.createdAt).toDateString()}
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <button className="text-white/70 p-2">
            <SquarePen size={20} strokeWidth={1.3} />
          </button>
          <button className="text-red">
            <Trash size={20} strokeWidth={1.3} />
          </button>
        </div>
      </div>
      <p className="max-w-[90%] w-full">{reflection.content}</p>
    </div>
  );
};
