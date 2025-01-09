import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");
    const id = parseInt(userId, 10);

    if (isNaN(id)) {
      return NextResponse.json(
        { message: "Invalid ID format" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
