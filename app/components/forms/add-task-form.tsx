"use client";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { TaskSchema, TaskSchemaProps } from "@/schema/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RootErrorCard } from "../common/root-error-card";
import { Loader2, CheckCircle } from "lucide-react";
export const AddTaskForm = ({ skillId }: { skillId: string }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<TaskSchemaProps>({
    resolver: zodResolver(TaskSchema),
  });
  const onSubmit: SubmitHandler<TaskSchemaProps> = async ({
    title,
    dueDate,
  }) => {
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        title,
        dueDate: new Date(dueDate),
        skillId,
      }),
    });
    if (res.status === 400)
      return setError("root", { message: "Invalid data" });
    if (res.status === 500)
      return setError("root", { message: "Server error. Please try again" });
    if (!res.ok)
      return setError("root", {
        message: "Unexpected error. Please try again",
      });
  };
  return (
    <div className="w-full p-3 border bg-secondary border-secondary-l rounded-xl space-y-3">
      <form
        className="w-full flex gap-3 flex-col md:flex-row items-start md:items-end justify-start "
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
            min={new Date().toISOString().split("T")[0]}
            {...register("dueDate")}
            errorMessage={errors.dueDate && errors.dueDate.message}
          />
        </div>

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
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      {isSubmitSuccessful && (
        <div className="w-full p-3 rounded-xl flex flex-col md:flex-row gap-3 text-green bg-green/20 border ">
          <span className="flex gap-2 w-full  ">
            <CheckCircle size={30} className="w-20 " />
            Task was added successfully. You will need to reload the page to see
            them.
          </span>
          <div className="w-full flex justify-end">
            <Button
              className="bg-inherit border h-fit border-green"
              onClick={() => window.location.reload()}
            >
              Reload
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
