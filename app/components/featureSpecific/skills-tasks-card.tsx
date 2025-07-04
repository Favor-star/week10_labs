import { MoveRight, Plus, Square, SquarePen, Trash } from "lucide-react";
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

export const TaskCard: FC<{ task: Task }> = ({ task }) => {
  const { title, dueDate, id } = task;
  return (
    <div className="w-full flex justify-between gap-2 items-center py-2 px-3 border  border-secondary-xl rounded-xl">
      <div className="flex items-center gap-2">
        {/* <input type="checkbox" name="skillDone" id="skillDone" /> */}
        <Square size={20} strokeWidth={1.6} />
        <div className="">
          <h2 className="font-bold text-base">{title}</h2>
          <p className="text-white/60 font-light text-sm">
            Due: <span>{new Date(dueDate).toDateString()}</span>
          </p>
        </div>
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
  );
};
