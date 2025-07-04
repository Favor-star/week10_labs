"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { SubmitHandler, useForm } from "react-hook-form";
import { ReflectionSchema, ReflectionSchemaProps } from "@/schema/zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const AddReflectionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ReflectionSchemaProps>({
    resolver: zodResolver(ReflectionSchema),
  });
  const onSubmit: SubmitHandler<ReflectionSchemaProps> = (data) => {
    console.log({ newMood: moods[Number(data.mood)].name, ...data });
  };
  return (
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
        <Button>Save reflection</Button>
      </div>
    </form>
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
