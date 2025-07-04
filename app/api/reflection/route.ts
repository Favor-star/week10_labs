import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ReflectionSchema, TaskSchema } from "@/schema/zod";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  try {
    const json = await req.json();
    const body = ReflectionSchema.parse(json);
    const { skillId } = body;
    if (!skillId)
      return NextResponse.json(
        { message: "Skill id is required" },
        { status: 400 }
      );
    const reflections = await prisma.reflection.findMany({
      where: { skillId },
    });
    return NextResponse.json(reflections, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      return NextResponse.json(
        { message: "Skill id is required", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Unhandled Error:", (error as Error).message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  try {
    const json = await req.json();
    const body = ReflectionSchema.parse(json);
    const { skillId, ...data } = body;
    if (!skillId)
      return NextResponse.json(
        { message: "Skill id is required" },
        { status: 400 }
      );
    const reflection = await prisma.reflection.create({
      data: {
        ...data,
        skill: {
          connect: { id: skillId },
        },
      },
    });
    return NextResponse.json(reflection, { status: 201 });
  } catch (error) {
    console.error(error);
    if (error instanceof ZodError) {
      console.error("Validation Error:", error.errors);
      return NextResponse.json(
        { message: "Skill id is required", details: error.errors },
        { status: 400 }
      );
    }
    console.error("Unhandled Error:", (error as Error).message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});
