"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TaskSchemaProps } from "@/schema/zod";
import { FC, useState, useEffect } from "react";
import { Task } from "@/generated/prisma";
import { RootErrorCard } from "../common/root-error-card";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export const TaskEditForm: FC<{ task: Task; handleCloseModal: () => void }> = ({
  task,
  handleCloseModal,
}) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<TaskSchemaProps>({
    defaultValues: {
      title: task.title,
      dueDate: new Date(task.dueDate).toISOString().split("T")[0],
    },
  });
  const onSubmit: SubmitHandler<TaskSchemaProps> = async ({
    title,
    dueDate,
  }) => {
    const changedFields: Partial<TaskSchemaProps> = {};
    const originalDueDate = new Date(task.dueDate).toISOString().split("T")[0];
    const newDueDate = new Date(dueDate).toISOString().split("T")[0];

    if (title !== task.title) changedFields.title = title;
    if (originalDueDate !== newDueDate) changedFields.dueDate = dueDate;

    const res = await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify(changedFields),
    });
    if (!res.ok)
      setError("root", { message: "There was an error. Please try again" });
  };

  const title = watch("title");
  const dueDate = watch("dueDate");

  useEffect(() => {
    const hasChanged =
      title !== task.title ||
      new Date(dueDate).toISOString().split("T")[0] !==
        new Date(task.dueDate).toISOString().split("T")[0];
    setCanUpdate(hasChanged);
  }, [title, dueDate]);
  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        router.refresh();
        reset();
        handleCloseModal();
      }, 2500);
    }
  }, [isSubmitSuccessful, handleCloseModal, router, reset]);
  return (
    <form
      className="w-full  border flex flex-col gap-5 bg-secondary p-3 rounded-xl border-secondary-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-bold text-xl">Edit task</h3>
      <p className="text-white/70">
        Data that you put here will replace data that are already stored. Feel
        free to leave what you don't want to change
      </p>
      <Input
        id="taskEditTitle"
        placeholder="Edit the task"
        label="Title"
        {...register("title")}
      />
      <Input
        id="taskEditDueDate"
        placeholder="Edit Due date"
        label="Due date"
        type="date"
        min={new Date().toISOString().split("T")[0]}
        {...register("dueDate")}
      />
      <div className="w-full flex gap-2 ">
        <Button
          className="text-white/70 bg-transparent border border-white/70"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button disabled={!canUpdate}>
          {isSubmitting && (
            <Loader2 className="animate-spin" size={18} strokeWidth={1.3} />
          )}
          Update task
        </Button>
      </div>
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      {isSubmitSuccessful && (
        <div className="w-full p-3 rounded-xl flex flex-row gap-3 text-green bg-green/20 border ">
          <CheckCircle size={30} className="w-20 " />
          Task was updated successfully.
        </div>
      )}
    </form>
  );
};
