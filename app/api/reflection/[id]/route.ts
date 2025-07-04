import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ReflectionSchemaProps } from "@/schema/zod";
import { NextResponse } from "next/server";

export const PATCH = auth(async function PATCH(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  const { id } = await params;
  try {
    const body: Partial<ReflectionSchemaProps> = await req.json();
    const updatedBody = await prisma.reflection.update({
      data: body,
      where: { id },
    });
    return NextResponse.json(updatedBody, { status: 200 });
  } catch (error) {
    console.error(error);
    console.error("Unhandled Error:", (error as Error).message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});

export const DELETE = auth(async function DELETE(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deletedData = await prisma.reflection.delete({
      where: { id },
    });
    return NextResponse.json(deletedData, { status: 200 });
  } catch (error) {
    console.error(error);
    console.error("Unhandled Error:", (error as Error).message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});
