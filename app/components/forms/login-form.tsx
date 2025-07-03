"use client";
import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginSchemaProps } from "@/schema/zod";
import { TriangleAlert, Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaProps>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<LoginSchemaProps> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirectTo: "/",
      redirect: false,
    });
    console.log(res.code);
    if (res.code === "Email doesn't exist") {
      setError("root", { message: "User doesn't exist. Please register!" });
      return;
    }
    if (res.error === "CredentialsSignin") {
      setError("root", { message: "Password is incorect" });
      return;
    }
  };
  return (
    <form
      className="w-full p-5 md:p-8 rounded-xl bg-secondary  space-y-6 border border-secondary-xl"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Email"
        type="email"
        id="loginEmail"
        placeholder="e.g: favor@gmail.com"
        {...register("email")}
        errorMessage={errors.email && errors.email.message}
      />
      <Input
        label="Password"
        type="password"
        placeholder="*******"
        id="loginPassword"
        {...register("password")}
        errorMessage={errors.password && errors.password.message}
      />
      <label className=" flex items-center gap-2 text-secondary-xxl text-lg">
        <input
          type="checkbox"
          name="rememberMe"
          id="rememberMe"
          className=" accent-accent"
        />
        Remember me
      </label>
      {errors.root && (
        <div className="bg-red/20 border-red/50 border text-red  flex gap-2 items-center p-3 rounded-xl">
          <TriangleAlert size={20} strokeWidth={1.3} />
          {errors.root && errors.root.message}
        </div>
      )}
      <Button className="w-full" disabled={isSubmitting} type="submit">
        {isSubmitting && (
          <Loader2 className="animate-spin" size={18} strokeWidth={1.3} />
        )}
        Sign in
      </Button>
      <p className="text-lg text-white/50 text-center w-full">
        Don't have an account?
        <Link href={"/register"} className="text-accent">
          {" "}
          Sign up
        </Link>
      </p>
    </form>
  );
};
