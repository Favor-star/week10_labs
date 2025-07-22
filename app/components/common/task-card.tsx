"use client";
import {
  Square,
  SquareCheckBig,
  SquarePen,
  Trash,
  Loader2,
} from "lucide-react";
import { Task } from "@/generated/prisma";
import { FC, useState } from "react";
import { Modal } from "./modal";
import { ModalDelete } from "./modal-delete-card";
import { useModal } from "@/app/hooks/useModal";
import { TaskEditForm } from "../forms/edit-task-form";
import { useRouter } from "next/navigation";
import { cn } from "@/lib";
export const TaskCard: FC<{ task: Task }> = ({ task }) => {
  const { handleCloseModal, handleOpenModal, isModalOpen } = useModal();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDone, setIsDone] = useState(task.isDone);
  const router = useRouter();
  const {
    handleCloseModal: handleCloseEditModal,
    handleOpenModal: handleOpenEditModal,
    isModalOpen: isEditModalOpen,
  } = useModal();
  const { title, dueDate, id } = task;

  const handleEditTaskStatus = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isDone: !isDone }),
      });

      if (res.ok) {
        setIsDone(!isDone);
        router.refresh();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <>
      <div className="w-full flex justify-between gap-2 items-center py-2 px-3 border  border-secondary-xl rounded-xl">
        <div className="flex items-center gap-2">
          {/* <input type="checkbox" name="skillDone" id="skillDone" /> */}
          <button onClick={handleEditTaskStatus} disabled={isUpdating}>
            {isUpdating ? (
              <Loader2 className="animate-spin" size={20} strokeWidth={1.6} />
            ) : isDone ? (
              <SquareCheckBig
                size={20}
                strokeWidth={1.6}
                className="text-green"
              />
            ) : (
              <Square size={20} strokeWidth={1.6} />
            )}
          </button>
          <div className="">
            <h2 className={cn("font-bold text-base", isDone && "line-through")}>
              {title}
            </h2>
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
