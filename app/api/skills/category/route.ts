import { prisma } from "@/lib/prisma";
import { CategorySchema } from "@/schema/zod";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const body = CategorySchema.parse(json);
    const category = await prisma.category.create({
      data: body,
    });
    return NextResponse.json(category);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          message: "Invalid data",
          error: error.errors,
        },
        { status: 400 }
      );
    }
    console.error(error);
  }
}
export async function GET() {
  try {
    const category = await prisma.category.findMany();
    return NextResponse.json(category);
  } catch (error) {
    console.error(error);
  }
}
