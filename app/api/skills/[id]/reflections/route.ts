import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(
  req,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  console.log(id);
  if (typeof id !== "string") {
    return NextResponse.json({ message: "Not a string" }, { status: 401 });
  }
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  try {
    const reflections = await prisma.reflection.findMany({
      where: {
        id,
      },
    });
    return NextResponse.json(reflections, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
});
