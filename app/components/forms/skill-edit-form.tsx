"use client";
import React, { FC, useEffect } from "react";
import { Input } from "../ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { SkillSchemaProps } from "@/schema/zod";
import { useState } from "react";
import { Button } from "../ui/button";
import { Trash, Loader2, CheckCircle } from "lucide-react";
import { Select } from "../ui/select";
import optionList from "@/data/categories";
import { RootErrorCard } from "../common/root-error-card";
import { Skill } from "@/generated/prisma";
import { useRouter } from "next/navigation";

export const SkillEditForm: FC<{
  skill: Skill;
  handleCloseModal: () => void;
}> = ({ skill, handleCloseModal }) => {
  const [canUpdate, setCanUpdate] = useState(false);
  const [objectives, setObjectives] = useState<{ value: string; id: string }[]>(
    []
  );
  const [singlObjective, setSinglObjective] = useState("");
  const router = useRouter();
  const matchingCategory = optionList.find(
    (cat) => cat.id === skill.categoryId
  );

  const handleAddObjective = () => {
    if (singlObjective === "") return;
    setObjectives([
      ...objectives,
      { value: singlObjective, id: crypto.randomUUID() },
    ]);
    setSinglObjective("");
  };

  const handleRemoveObjective = (id: string) => {
    setObjectives((objectives) =>
      objectives.filter(({ id: objectiveId }) => objectiveId !== id)
    );
  };

  const {
    handleSubmit,
    register,
    watch,
    setError,
    reset,
    formState: { isSubmitting, isSubmitSuccessful, errors },
  } = useForm<SkillSchemaProps>({
    defaultValues: {
      title: skill.title,
      description: skill.description,
      categoryId: matchingCategory?.id || "",
    },
  });
  const onSubmit: SubmitHandler<SkillSchemaProps> = async ({
    title,
    description,
    categoryId,
  }) => {
    const changedFields: Partial<SkillSchemaProps> = {};

    if (title !== skill.title) changedFields.title = title;
    if (description !== skill.description)
      changedFields.description = description;
    if (categoryId !== skill.categoryId) changedFields.categoryId = categoryId;

    const res = await fetch(`/api/skills/${skill.id}`, {
      method: "PATCH",
      body: JSON.stringify(changedFields),
    });

    if (!res.ok) {
      setError("root", { message: "There was an error. Please try again" });
    }
  };

  const title = watch("title");
  const description = watch("description");
  const categoryId = watch("categoryId");

  useEffect(() => {
    const hasChanged =
      title !== skill.title ||
      description !== skill.description ||
      categoryId !== skill.categoryId;
    setCanUpdate(hasChanged);
  }, [
    title,
    description,
    categoryId,
    skill.title,
    skill.description,
    skill.categoryId,
  ]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        router.refresh();
        reset();
        handleCloseModal();
      }, 2500);
    }
  }, [isSubmitSuccessful, router, reset, handleCloseModal]);

  return (
    <form
      className="w-full border flex flex-col gap-5 bg-secondary p-3 rounded-xl border-secondary-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h3 className="font-bold text-xl">Edit skill</h3>
      <p className="text-white/70">
        Data that you put here will replace data that are already stored. Feel
        free to leave what you don't want to change
      </p>
      <Input
        label="Update a skill title"
        placeholder="e.g: Master ReactJS"
        id="editSkillTitle"
        {...register("title")}
      />
      <Textarea
        label="Update descriptions"
        placeholder="Add a small description"
        id="editSkillDescription"
        {...register("description")}
      />
      <Select {...register("categoryId")} optionsList={optionList} />
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
          Update Skill
        </Button>
      </div>
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      {isSubmitSuccessful && (
        <div className="w-full p-3 rounded-xl flex flex-row gap-3 text-green bg-green/20 border ">
          <CheckCircle size={30} className="w-20 " />
          Skill was updated successfully.
        </div>
      )}
    </form>
  );
};
