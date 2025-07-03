import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const skill = await prisma.skill.findUnique({
      where: {
        id,
      },
    });
    if (!skill)
      return NextResponse.json(
        {
          error: "SKill not found",
        },
        {
          status: 404,
        }
      );
    return NextResponse.json(skill);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Server error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updatedSkill = await prisma.skill.update({
      where: { id },
      data: body,
    });
    return NextResponse.json(updatedSkill, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const deletedSkill = await prisma.skill.delete({
      where: { id },
    });
    return NextResponse.json(deletedSkill);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
