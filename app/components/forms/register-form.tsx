"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterSchema, RegisterSchemaProps } from "@/schema/zod";
import { Loader2,  } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { RootErrorCard } from "../common/root-error-card";

export const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaProps>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaProps> = async ({
    email,
    password,
    confirmPassword,
    name,
  }) => {
    try {
      const res = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, confirmPassword }),
      });
      const result = await res.json();
      if (result.message.includes("exists"))
        return setError("root", { message: "User already exists" });
      router.push("/login");
    } catch (error) {
      console.error(error);
      setError("root", { message: "There were an error. Please try again" });
    }
  };
  return (
    <form
      className=" w-full p-5 md:p-8 rounded-xl bg-secondary  space-y-6 border border-secondary-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Full name"
        placeholder="e.g: Favor Eliab"
        id="registerName"
        {...register("name")}
        errorMessage={errors.name && errors.name.message}
      />
      <Input
        label="Email"
        type="email"
        placeholder="e.g: favor@gmail.com"
        id="registerEmail"
        {...register("email")}
        errorMessage={errors.email && errors.email.message}
      />
      <Input
        label="Password"
        placeholder="******"
        id="registerPassword"
        type="password"
        {...register("password")}
        errorMessage={errors.password && errors.password.message}
      />
      <Input
        label="Confirm Password"
        placeholder="******"
        id="registerConfirmPassword"
        type="password"
        {...register("confirmPassword")}
        errorMessage={errors.confirmPassword && errors.confirmPassword.message}
      />
      {errors.root?.message && (
        <RootErrorCard errorMessage={errors.root.message} />
      )}
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting && (
          <Loader2 className="animate-spin" size={18} strokeWidth={1.3} />
        )}
        Register
      </Button>
      <p className="text-lg text-white/50 text-center w-full">
        Already have an account?
        <Link href={"/login"} className="text-accent">
          {" "}
          Sign in
        </Link>
      </p>
    </form>
  );
};
