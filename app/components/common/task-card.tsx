"use client";
import { Square, SquarePen, Trash } from "lucide-react";
import { Task } from "@/generated/prisma";
import { FC, useState } from "react";
import { Modal } from "./modal";
import { ModalDelete } from "./modal-delete-card";
import { useModal } from "@/app/hooks/useModal";
import { TaskEditForm } from "../forms/edit-task-form";
export const TaskCard: FC<{ task: Task }> = ({ task }) => {
  const { handleCloseModal, handleOpenModal, isModalOpen } = useModal();
  const {
    handleCloseModal: handleCloseEditModal,
    handleOpenModal: handleOpenEditModal,
    isModalOpen: isEditModalOpen,
  } = useModal();
  const { title, dueDate, id } = task;
  return (
    <>
      <div className="w-full flex justify-between gap-2 items-center py-2 px-3 border  border-secondary-xl rounded-xl">
        <div className="flex items-center gap-2">
          {/* <input type="checkbox" name="skillDone" id="skillDone" /> */}
          <Square size={20} strokeWidth={1.6} />
          <div className="">
            <h2 className="font-bold text-base">{title}</h2>
            <p className="text-white/60 font-light text-sm">
              Due: <span>{new Date(dueDate).toDateString()}</span>
            </p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <button className="text-white/70 p-2" onClick={handleOpenEditModal}>
            <SquarePen size={20} strokeWidth={1.3} />
          </button>
          <button className="text-red" onClick={handleOpenModal}>
            <Trash size={20} strokeWidth={1.3} />
          </button>
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <ModalDelete id={id} handleCloseModal={handleCloseModal} type="task" />
      </Modal>
      <Modal
        isModalOpen={isEditModalOpen}
        handleCloseModal={handleCloseEditModal}
      >
        <TaskEditForm task={task} handleCloseModal={handleCloseEditModal} />
      </Modal>
    </>
  );
};
