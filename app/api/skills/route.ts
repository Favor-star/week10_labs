import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { SkillSchema } from "@/schema/zod";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  try {
    const userId = req.auth.user?.id;
    const skills = await prisma.skill.findMany({
      include: {
        reflections: true,
        task: true,
      },
      where: {
        userId,
      },
    });
    return Response.json(skills);
  } catch (error) {
    console.error(error);
    throw new Error();
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  try {
    const userId = req.auth.user?.id;
    const json = await req.json();
    const { categoryId, ...body } = SkillSchema.parse(json);
    const skill = await prisma.skill.create({
      data: {
        ...body,
        category: {
          connect: { id: categoryId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      return NextResponse.json(
        { error: "Invalid data", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Unhandled Error:", (error as Error).message);
    return NextResponse.json({ error: "Serverless error" }, { status: 500 });
  }
});
