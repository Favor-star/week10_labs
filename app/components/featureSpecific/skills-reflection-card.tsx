import { Button } from "../ui/button";
import { Plus, MoveRight, SquarePen, Trash } from "lucide-react";
export const SkillsReflectionCard = () => {
  return (
    <div className="w-full flex gap-3 p-3 flex-col items-center">
      <div className="w-full flex justify-between items-center py-2">
        <p className="text-xl  font-bold">Learning reflections</p>
        <Button>
          <Plus size={18} strokeWidth={1.4} />
          Add reflection
        </Button>
      </div>
      {Array(4)
        .fill("")
        .map((_, i) => (
          <ReflectionCard key={i} />
        ))}
      <Button>
        View More
        <MoveRight strokeWidth={1.4} />
      </Button>
    </div>
  );
};

export const ReflectionCard = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-2  py-2 px-3 border  border-secondary-xl rounded-xl">
      <div className="flex items-center justify-between gap-2">
        <div className="space-x-2">
          <p className="font-bold text-base inline-block">Mood 😊</p>
          <p className="text-white/60 font-light text-sm inline-block">
            Dec 20, 2025
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
      <p className="max-w-[90%] w-full">
        Finally understood how closures work! The concept of lexical scoping
        makes so much more sense now. I was able to implement a counter function
        using closures and it felt like a breakthrough moment.
      </p>
    </div>
  );
};
