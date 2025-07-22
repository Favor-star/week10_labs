"use client";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import { SubmitHandler, useForm } from "react-hook-form";
import { SkillSchema, SkillSchemaProps } from "@/schema/zod";
import { useState, useEffect } from "react";
import { Trash, Loader2, CheckCircle, TriangleAlert } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import optionList from "@/data/categories";
import { RootErrorCard } from "../common/root-error-card";
export const AddSKillForm = () => {
  const [objectives, setObjectives] = useState<{ value: string; id: string }[]>(
    []
  );
  const [singlObjective, setSinglObjective] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SkillSchemaProps>({
    resolver: zodResolver(SkillSchema),
  });
  useEffect(() => {
    if (isSubmitSuccessful) {
      setTimeout(() => {
        reset();
        setObjectives([]);
      }, 5000);
    }
  }, [isSubmitSuccessful]);
  const onSubmit: SubmitHandler<SkillSchemaProps> = async ({
    categoryId,
    description,
    title,
  }) => {
    const cleanObjectives =
      objectives.length > 0 ? objectives.map(({ value }) => value) : [];
    try {
      const res = await fetch("/api/skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          description,
          title,
          objectives: cleanObjectives,
        }),
      });
      if (res.status === 400)
        return setError("root", { message: "Invalid data. Please try again" });

      if (res.status === 500)
        return setError("root", { message: "Server error. Please try again" });

      if (!res.ok)
        return setError("root", {
          message: "Something went wrong. Please try again",
        });
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };
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
  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Add a skill title"
        placeholder="e.g: Master ReactJS"
        id="addSkillTitle"
        {...register("title")}
        errorMessage={errors.title && errors.title.message}
      />
      <Textarea
        label="Add descriptions"
        placeholder="Add a small description"
        id="addSKillDescription"
        {...register("description")}
        errorMessage={errors.description && errors.description.message}
      />
      <div className="w-full flex items-end gap-2">
        <Input
          label="Add objective"
          type={"text"}
          placeholder={"Add an objective"}
          id={"ObjectiveInput"}
          value={singlObjective}
          onChange={(e) => setSinglObjective(e.target.value)}
        />
        <Button
          className="h-fit w-fit text-nowrap flex-1"
          onClick={handleAddObjective}
        >
          Add Objective
        </Button>
      </div>
      {objectives.length > 0 && (
        <ul className="p-5 space-y-2">
          {objectives.map(({ id, value }) => (
            <li
              key={id}
              className="flex w-full justify-between  bg-secondary p-2 rounded-lg"
            >
              {value}
              <button onClick={() => handleRemoveObjective(id)}>
                <Trash size={18} strokeWidth={1.3} className="text-red" />
              </button>
            </li>
          ))}
        </ul>
      )}
      <Select
        {...register("categoryId")}
        optionsList={optionList}
        errorMessage={errors.categoryId && errors.categoryId.message}
      />
      {isSubmitSuccessful && (
        <div className="flex items-center gap-2 justify-start text-green bg-green/20 border border-green p-3 py-4 rounded-xl">
          <CheckCircle strokeWidth={1.4} size={30} />
          <p className="font-medium ">Skill was added successfully</p>
        </div>
      )}
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      <div className="w-fit space-x-4 mt-5 block">
        <Button className="inline-flex px-5 bg-secondary-l">Clear</Button>
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
      </div>
    </form>
  );
};
