"use client";
import React from "react";
import { Textarea } from "../ui/textarea";
import { Select } from "../ui/select";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

export const AddReflectionForm = () => {
  const { register } = useForm();
  return (
    <form className="w-full space-y-8 p-3 border bg-secondary border-secondary-l rounded-xl">
      <Textarea
        label="Add reflection"
        id="reflectionText"
        placeholder="Share your thought on this skill"
      />
      <div className="w-full flex justify-between items-start md:items-center flex-col gap-3 md:flex-row">
        <div className="w-full md:max-w-[300px]">
          <Select optionsList={moods} />
        </div>
        <Button>Save reflection</Button>
      </div>
    </form>
  );
};

const moods = [
  {
    id: "123",
    name: "😊 Happy",
  },

  {
    id: "123",
    name: "😐 Neutral",
  },
  {
    id: "123",
    name: "😣 Sad",
  },
];
