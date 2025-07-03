import { z } from "zod";
import { email } from "zod/v4";

export const SkillSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  hasStarted: z.boolean().optional(),
  progress: z.number().optional(),
  categoryId: z.string(),
});

export const ReflectionSchema = z.object({
  content: z.string().min(1),
  createdAt: z.date().optional(),
  skillId: z.string().optional(),
});
export const CategorySchema = z.object({
  name: z.string().min(1),
});

export const RegisterSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.string().email(),
    password: z.string().min(5, { message: "5 minimum characters" }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password must match",
    path: ["confirmPassword"],
  });
export const LoginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterSchemaProps = z.infer<typeof RegisterSchema> & {
  confirmPassword?: string;
};
export type LoginSchemaProps = z.infer<typeof LoginSchema>;
export type SkillSchemaProps = z.infer<typeof SkillSchema>;
export type ReflectionSchemaProps = z.infer<typeof ReflectionSchema>;
