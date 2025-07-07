"use client";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { SquarePen, Trash } from "lucide-react";
import { Skill } from "@/generated/prisma";
import { Modal } from "../common/modal";
import { ModalDelete } from "../common/modal-delete-card";
import { useModal } from "@/app/hooks/useModal";

export const SkillTitleCard: FC<{ data: Skill }> = ({ data }) => {
  const { id, title, description, createdAt } = data;
  const { handleCloseModal, handleOpenModal, isModalOpen } = useModal();
  return (
    <>
      <div className="p-5 rounded-xl bg-secondary border border-secondary-l flex flex-col gap-4">
        <div className="flex md:flex-row flex-col gap-3 justify-between items-center">
          <p className="font-extrabold text-2xl md:text-3xl ">{title}</p>
          <div className="flex gap-3">
            <Button className="">
              <SquarePen strokeWidth={1.5} />
              Edit
            </Button>
            <Button
              className=" bg-transparent border border-red text-red"
              onClick={handleOpenModal}
            >
              <Trash strokeWidth={1.5} />
              Delete
            </Button>
          </div>
        </div>
        <p className="text-base md:text-lg text-secondary-xxl w-full md:w-11/12 text-balance md:text-wrap">
          {description}
        </p>
        <div className="w-full space-x-3 md:space-x-20">
          <div className="inline-block p-2 text-sm md:text-base bg-green/20 text-green rounded-lg space-x-2">
            <span className="aspect-square w-3 h-3 rounded-full bg-green inline-block"></span>
            <p className="inline-block">In progress</p>
          </div>
          <p className="inline-block mt-2 text-secondary-xxl">
            <span>Started: </span>
            <span>{new Date(createdAt).toDateString()} </span>
          </p>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <ModalDelete id={id} type="skill" handleCloseModal={handleCloseModal} />
      </Modal>
    </>
  );
};
