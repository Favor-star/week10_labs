import { z } from "zod";


export const SkillSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  hasStarted: z.boolean().optional(),
  progress: z.number().optional(),
});

export const ReflectionSchema = z.object({
  content: z.string().min(1),
  createdAt: z.date().optional(),
  skillId: z.string().optional(),
});
export const CategorySchema = z.object({
  name: z.string().min(1),
});
export type SkillSchemaProps = z.infer<typeof SkillSchema>;
export type ReflectionSchemaProps = z.infer<typeof ReflectionSchema>;
