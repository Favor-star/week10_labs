"use client";
import { FC } from "react";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReflectionSchema, ReflectionSchemaProps } from "@/schema/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, Loader2 } from "lucide-react";
import { RootErrorCard } from "../common/root-error-card";

export const AddReflectionForm: FC<{ skillId: string }> = ({ skillId }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ReflectionSchemaProps>({
    resolver: zodResolver(ReflectionSchema),
  });
  const onSubmit: SubmitHandler<ReflectionSchemaProps> = async (data) => {
    console.log({ newMood: moods[Number(data.mood)].name, ...data });
    const newMood = moods[Number(data.mood)].name;
    const { content } = data;
    const res = await fetch("/api/reflection", {
      method: "POST",
      body: JSON.stringify({ mood: newMood, content, skillId }),
    });
    if (res.status === 400)
      return setError("root", {
        message: "Data is invalid. Please try again.",
      });
    if (res.status === 500)
      return setError("root", {
        message: "Server error. Please try again.",
      });
    if (!res.ok)
      return setError("root", {
        message: "Server error. Please consider trying again.",
      });
    console.log(await res.json());
  };

  return (
    <>
      <form
        className="w-full space-y-8 p-3 border bg-secondary border-secondary-l rounded-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Textarea
          label="Add reflection"
          id="reflectionText"
          placeholder="Share your thought on this skill"
          {...register("content")}
          errorMessage={errors.content && errors.content.message}
        />
        <div className="w-full flex justify-between items-start md:items-center flex-col gap-3 md:flex-row">
          <div className="w-full md:max-w-[300px]">
            <Select
              optionsList={moods}
              {...register("mood")}
              errorMessage={errors.mood?.message}
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
            Save Reflection
          </Button>
        </div>
      </form>
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      {isSubmitSuccessful && (
        <div className="w-full p-3 rounded-xl flex flex-col md:flex-row gap-3 text-green bg-green/20 border ">
          <span className="flex gap-2 w-full  ">
            <CheckCircle size={30} className="w-20 " />
            Reflection were submitted successfully. You will need to reload the
            page to see them.
          </span>
          <div className="w-full flex justify-end">
            <Button
              className="bg-inherit border border-green"
              onClick={() => window.location.reload()}
            >
              Reload
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const moods = [
  {
    id: "0",
    name: "😊 Happy",
  },

  {
    id: "1",
    name: "😐 Neutral",
  },
  {
    id: "2",
    name: "😣 Sad",
  },
];
