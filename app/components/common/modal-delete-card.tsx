"use client";
import { FC } from "react";
import { Button } from "../ui/button";
import { Loader2, Trash } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
interface ModalDeleteProps {
  type: "skill" | "task" | "reflection";
  id: string;
  handleCloseModal: () => void;
}
export const ModalDelete: FC<ModalDeleteProps> = ({
  type,
  id,
  handleCloseModal,
}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const handleDelete = async () => {
    let link: string;
    switch (type) {
      case "skill":
        link = `/api/skills`;
        break;
      case "reflection":
        link = `/api/reflection/${id}`;
        break;
      case "task":
        link = `/api/tasks/${id}`;
        break;
      default:
        link = "";
        break;
    }
    try {
      setIsSubmitting(true);
      if (link.length === 0) {
        setError("Link is unavailable.");
        setIsSubmitting(false);
        return;
      }
      const res = await fetch(link, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        setIsSubmitting(false);
        setError(
          res.status === 400
            ? "Invalid data. Please try again"
            : "Server error. Please try again"
        );
        return;
      }
      setIsSubmitting(false);

      if (link === "api/skills") {
        return router.push("/vault");
      }
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError(" Server error. Please try again");
    }
  };

  return (
    <div className="w-full max-w-[500px] bg-secondary text-white p-3 rounded-xl border border-secondary-xl space-y-4">
      <h3 className="font-bold text-2xl">Are you sure?</h3>
      <p className="">
        This action is irrevasible. You will loose access to this content.
      </p>
      <div className="flex gap-5 mt-5  justify-end  items-start ">
        <Button
          className="text-white/70 bg-transparent border border-white/70"
          onClick={handleCloseModal}
        >
          Cancel
        </Button>
        <Button className="text-white bg-red" onClick={handleDelete}>
          {!isSubmitting && <Trash />}
          {isSubmitting && (
            <Loader2 className="animate-spin" size={18} strokeWidth={1.3} />
          )}
          Delete
        </Button>
      </div>
    </div>
  );
};
