import { useState } from "react";

export function useModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  return { isModalOpen, handleCloseModal, handleOpenModal };
}
