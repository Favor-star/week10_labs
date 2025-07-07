"use client";
import { Reflection } from "@/generated/prisma";
import { SquarePen, Trash } from "lucide-react";
import { Modal } from "../common/modal";
import { ModalDelete } from "../common/modal-delete-card";
import { useModal } from "@/app/hooks/useModal";
import { ReflectionEditForm } from "../forms/edit-reflection-form";

export const ReflectionCard = ({ reflection }: { reflection: Reflection }) => {
  const { handleCloseModal, handleOpenModal, isModalOpen } = useModal();
    
  const {
    handleCloseModal: handleReflectionClose,
    handleOpenModal: handleReflectionOpen,
    isModalOpen: isReflectionOpen,
  } = useModal();

  return (
    <>
      <div className="w-full flex flex-col justify-center gap-2  py-2 px-3 border  border-secondary-xl rounded-xl">
        <div className="flex items-center justify-between gap-2">
          <div className="space-x-2">
            <p className="font-bold text-base inline-block">
              {reflection.mood}
            </p>
            <p className="text-white/60 font-light text-sm inline-block">
              {new Date(reflection.createdAt).toDateString()}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <button
              className="text-white/70 p-2"
              onClick={handleReflectionOpen}
            >
              <SquarePen size={20} strokeWidth={1.3} />
            </button>
            <button className="text-red" onClick={handleOpenModal}>
              <Trash size={20} strokeWidth={1.3} />
            </button>
          </div>
        </div>
        <p className="max-w-[90%] w-full">{reflection.content}</p>
      </div>
      <Modal isModalOpen={isModalOpen} handleCloseModal={handleCloseModal}>
        <ModalDelete
          type="reflection"
          id={reflection.id}
          handleCloseModal={handleCloseModal}
        />
      </Modal>
      <Modal
        handleCloseModal={handleReflectionClose}
        isModalOpen={isReflectionOpen}
      >
        <ReflectionEditForm
          reflection={reflection}
          handleCloseModal={handleReflectionClose}
        />
      </Modal>
    </>
  );
};
