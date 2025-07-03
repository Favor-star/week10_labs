import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { SkillSchema } from "@/schema/zod";
import { ZodError } from "zod";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const skills = await prisma.skill.findMany();
    return Response.json(skills);
  } catch (error) {
    console.error(error);
    throw new Error();
  }
}
export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = SkillSchema.parse(json);
    const user = await prisma.skill.create({
      data: {
        ...body,
        Category: {
          connect: { id: "01JZ6ERT7ZDCTPFVPPE5QB57T2" },
        },
      },
    });
    return NextResponse.json(user, { status: 201 });
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
}
