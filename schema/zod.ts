import { z } from "zod/v4";

export const SkillSchema = z.object({
  title: z.string().min(1, { message: "Skill title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  categoryId: z.string().refine((val) => val !== "", {
    message: "Please select a valid category",
  }),
  objectives: z.array(z.string()).optional(),
});

export const ReflectionSchema = z.object({
  content: z.string().min(1),
  mood: z.string().refine((val) => val !== "", {
    message: "Please select a valid mood",
  }),
  skillId: z.string(),
});
export const CategorySchema = z.object({
  name: z.string().min(1),
});

export const RegisterSchema = z
  .object({
    name: z.string().nonempty({ message: "Name is required" }),
    email: z.email(),
    password: z.string().min(5, { message: "5 minimum characters" }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Password must match",
    path: ["confirmPassword"],
  });
export const LoginSchema = z.object({
  email: z.email().nonempty({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterSchemaProps = z.infer<typeof RegisterSchema> & {
  confirmPassword?: string;
};
export type LoginSchemaProps = z.infer<typeof LoginSchema>;
export type SkillSchemaProps = z.infer<typeof SkillSchema>;
export type ReflectionSchemaProps = z.infer<typeof ReflectionSchema>;
