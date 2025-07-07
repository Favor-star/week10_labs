import { MoveRight, Plus } from "lucide-react";
import { TaskCard } from "../common/task-card";
import { FC } from "react";
import { Button } from "../ui/button";
import { Skill, Task } from "@/generated/prisma";
import Link from "next/link";

export const SkillsTasksCard: FC<{ data: Skill }> = ({ data }) => {
  const { id } = data;
  //@ts-ignore
  const task = data.task as Task[];
  return (
    <>
      <div className="w-full flex gap-3 flex-col p-3 items-center">
        <div className="w-full flex justify-between items-center py-2">
          <p className="text-xl  font-bold">Tasks</p>
          <Link href={`/vault/${id}/tasks`}>
            <Button>
              <Plus size={18} strokeWidth={1.4} />
              Add a task
            </Button>
          </Link>
        </div>
        {task.length > 0 &&
          task.map((task) => <TaskCard key={task.id} task={task} />)}
        {task.length === 0 && (
          <p className="p-2 w-full text-start  text-white/70 italic">
            No tasks added yet
          </p>
        )}
        {task.length > 0 && (
          <Button>
            View More
            <MoveRight strokeWidth={1.4} />
          </Button>
        )}
      </div>
    </>
  );
};
