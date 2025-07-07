"use client";
import { Skill, Task } from "@/generated/prisma";
import { MoveRight, Trash, SquarePen } from "lucide-react";
import { FC } from "react";
import categoriesList from "@/data/categories";
import Link from "next/link";
import { useModal } from "@/app/hooks/useModal";
import { ModalDelete } from "../common/modal-delete-card";
import { Modal } from "../common/modal";
import { SkillEditForm } from "../forms/skill-edit-form";

export const DashboardSkillCard: FC<{ data: Skill }> = ({ data }) => {
  const { id, title, categoryId } = data;
  const category = categoriesList.filter((cat) => cat.id === categoryId)[0];
  //@ts-expect-error
  const completedTasks = data.task.filter((data: Task) => data.isDone);
  //@ts-expect-error
  const tasks: Task[] = data.task;
  const { handleCloseModal, handleOpenModal, isModalOpen } = useModal();
  const {
    handleCloseModal: handleCloseSkill,
    handleOpenModal: handleOpenSkill,
    isModalOpen: isSKillOpen,
  } = useModal();
  return (
    <>
      <div className=" w-full flex flex-col justify-center items-start p-5 rounded-xl gap-2 bg-secondary border border-secondary-l">
        <div className="w-full flex justify-between items-start">
          <div className=" flex-col gap-1 ">
            <p className="text-base font-bold w-full">{title}</p>
            <p className="text-secondary-xl text-sm">{category.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <button className="text-red" onClick={handleOpenModal}>
              <Trash strokeWidth={1.3} size={20} className="text-red" />
            </button>
            <button onClick={handleOpenSkill}>
              <SquarePen size={20} strokeWidth={1.3} />
            </button>
          </div>
        </div>
        <p className="w-full flex justify-between">
          <span>Progress</span>
          <span>
            {completedTasks.length}/{tasks.length} tasks
          </span>
        </p>
        <div className="h-3 w-full rounded-full overflow-hidden bg-secondary-l">
          <span
            className="h-full bg-accent block "
            style={{
              width: `${
                (completedTasks.length /
                  (tasks.length === 0 ? 1 : tasks.length)) *
                100
              }%`,
            }}
          ></span>
        </div>
        <div className="w-full flex justify-between items-end mt-3">
          <Link
            href={`/vault/${id}`}
            className="p-2 rounded-lg bg-accent/30 border border-accent text-white text-sm flex items-center gap-2"
          >
            View SKill
            <MoveRight strokeWidth={1.3} />
          </Link>
          {/* <span className="p-2 rounded-lg text-xs text-green bg-green/20">
            In Progress
          </span> */}
        </div>
      </div>
      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <ModalDelete
          type="skill"
          handleCloseModal={handleCloseModal}
          id={data.id}
        />
      </Modal>
      <Modal isModalOpen={isSKillOpen} handleCloseModal={handleCloseSkill}>
        <SkillEditForm handleCloseModal={handleCloseSkill} skill={data} />
      </Modal>
    </>
  );
};
