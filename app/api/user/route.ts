import { hashPassword } from "@/lib";
import { prisma } from "@/lib/prisma";
import { RegisterSchema } from "@/schema/zod";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { email, password, name } = RegisterSchema.parse(json);
    const hashedPassword = hashPassword(password);
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    const createdUser = await prisma.user.create({
      data: { name, password: hashedPassword, email },
    });
    return NextResponse.json(
      { user: createdUser, message: "User created" },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Invalid data.",
          error: error.errors,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Server error",
        error: error,
      },
      { status: 500 }
    );
  }
}
