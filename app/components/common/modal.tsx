import { cn } from "@/lib";
import { FC, ReactNode } from "react";

interface ModalProps {
  handleModalClose?: () => void;
  children: ReactNode;
  isModalOpen?: boolean;
}
export const Modal: FC<ModalProps> = ({
  handleModalClose,
  children,
  isModalOpen = true,
}) => {
  return (
    <section
      className={cn(
        "fixed top-0 left-0 h-screen w-screen bg-primary/30 backdrop-blur-sm  transition-all duration-300 origin-center",
        isModalOpen ? "scale-100  z-50" : "scale-0 opacity-0 -z-50"
      )}
      onClick={handleModalClose}
    >
      <section
        className="w-full h-full  px-4 flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </section>
    </section>
  );
};
