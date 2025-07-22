"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ReflectionSchemaProps } from "@/schema/zod";
import { FC, useState, useEffect } from "react";
import { Reflection } from "@/generated/prisma";
import { RootErrorCard } from "../common/root-error-card";
import { CheckCircle, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { moods } from "./add-reflection-form";

export const ReflectionEditForm: FC<{
  reflection: Reflection;
  handleCloseModal: () => void;
}> = ({ reflection, handleCloseModal }) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const matchingMood = moods.find((m) => m.name === reflection.mood);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<ReflectionSchemaProps>({
    defaultValues: {
      content: reflection.content,
      mood: matchingMood?.id,
    },
  });
  const onSubmit: SubmitHandler<ReflectionSchemaProps> = async ({
    content,
    mood,
  }) => {
    const changedFields: Partial<ReflectionSchemaProps> = {};

    if (content !== reflection.content) changedFields.content = content;
    if (mood !== reflection.mood && mood !== "")
      changedFields.mood = moods[Number(mood)].name;

    const res = await fetch(`/api/reflection/${reflection.id}`, {
      method: "PATCH",
      body: JSON.stringify(changedFields),
    });
    if (!res.ok)
      setError("root", { message: "There was an error. Please try again" });
  };

  const content = watch("content");
  const mood = watch("mood");

  useEffect(() => {
    const hasChanged =
      content !== reflection.content ||
      (mood !== reflection.mood && mood !== "");
    setCanUpdate(hasChanged);
  }, [content, mood]);
  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        router.refresh();
        reset();
        handleCloseModal();
      }, 2500);
    }
  }, [isSubmitSuccessful, handleCloseModal, reset, reflection]);
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
      <Textarea
        id="reflectionEditContent"
        placeholder="Edit the reflection content"
        label="Title"
        {...register("content")}
      />
      <Select optionsList={moods} {...register("mood")} />
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
          Update Reflection
        </Button>
      </div>
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      {isSubmitSuccessful && (
        <div className="w-full p-3 rounded-xl flex flex-row gap-3 text-green bg-green/20 border ">
          <CheckCircle size={30} className="w-20 " />
          Reflection was updated successfully.
        </div>
      )}
    </form>
  );
};
