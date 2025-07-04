import React from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
export const AddSKillForm = () => {
  return (
    <form className="w-full space-y-4">
      <Input
        label="Add a skill title"
        placeholder="e.g: Master ReactJS"
        id="addSkillTitle"
      />
      <Textarea
        label="Add descriptions"
        placeholder="Add a small description"
        id="addSKillDescription"
      />
      <div className="w-full flex items-end gap-2">
        <Input
          label="Add objective"
          type={"text"}
          placeholder={"Add an objective"}
          id={"ObjectiveInput"}
        />
        <Button className="h-fit w-fit text-nowrap flex-1">
          Add Objective
        </Button>
      </div>
      <Select />
      <div className="w-fit space-x-4 mt-10 block">
        <Button className="inline-flex px-5 bg-secondary-l">Cancel</Button>
        <Button className="inline-flex px-10">Add Skill</Button>
      </div>
    </form>
  );
};
