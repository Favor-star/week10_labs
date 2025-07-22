"use client";
import { cn } from "@/lib";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}
export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        "bg-accent text-white rounded-lg p-3 px-4 w-fit flex items-center justify-center gap-2 disabled:bg-accent/70 disabled:text-white/70",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
