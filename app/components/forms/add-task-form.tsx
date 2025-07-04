"use client";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Modal } from "../common/modal";
import { ModalDelete } from "../common/modal-delete-card";
import { TaskSchema, TaskSchemaProps } from "@/schema/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootErrorCard } from "../common/root-error-card";
import { Loader2 } from "lucide-react";
export const AddTaskForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TaskSchemaProps>({
    resolver: zodResolver(TaskSchema),
  });
  const onSubmit: SubmitHandler<TaskSchemaProps> = async ({
    title,
    dueDate,
    skillId,
  }) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({ title, dueDate, skillId }),
    });
    if (res.status === 400)
      return setError("root", { message: "Invalid data" });
    if (res.status === 500)
      return setError("root", { message: "Server error. Please try again" });
    if (!res.ok)
      return setError("root", {
        message: "Unexpected error. Please try again",
      });
    const result = await res.json();
    console.log(result);
  };
  return (
    <>
      <form
        className="w-full flex gap-3 flex-col md:flex-row items-start md:items-end justify-start p-3 border bg-secondary border-secondary-l rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          label="Add a task"
          id="addTaskInput"
          placeholder="Add a specific task here"
          {...register("title")}
          errorMessage={errors.title && errors.title.message}
        />
        <div className="flex-1/2">
          <Input
            type="date"
            label="Due date"
            id="skillDueDateInput"
            placeholder=""
            {...register("dueDate")}
            errorMessage={errors.dueDate && errors.dueDate.message}
          />
        </div>
        {errors.root?.message && (
          <RootErrorCard errorMessage={errors.root.message} />
        )}
        <Button
          className="inline-flex px-10"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting && (
            <Loader2 className="animate-spin" size={18} strokeWidth={1.3} />
          )}
          Submit
        </Button>
      </form>
    </>
  );
};
