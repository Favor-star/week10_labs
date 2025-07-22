"use client";
import { cn } from "@/lib";
import { FC, ReactNode } from "react";

interface ModalProps {
  handleCloseModal: () => void;
  children: ReactNode;
  isModalOpen: boolean;
}
export const Modal: FC<ModalProps> = ({
  handleCloseModal,
  children,
  isModalOpen = false,
}) => {
  return (
    <section
      className={cn(
        "fixed top-0 left-0 h-screen w-screen flex items-center justify-center  bg-primary/30 backdrop-blur-sm  transition-all duration-300 origin-center",
        isModalOpen ? "scale-100  z-50" : "scale-0 opacity-0 -z-50"
      )}
      onClick={handleCloseModal}
    >
      <section
        className=" w-full max-w-[700px] flex items-center justify-center px-4 pe-8"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </section>
  );
};
