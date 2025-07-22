import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const category = await prisma.category.findMany();
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.log(error);
    throw new Error(typeof error === "string" ? error : JSON.stringify(error));
  }
}
