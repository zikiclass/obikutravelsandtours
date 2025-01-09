import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { adminSchema } from "../../../validationSchema";
import bcrypt from "bcrypt";

export async function GET(request) {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (user) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json({ message: "Admin not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json("status", { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const adminId = req.nextUrl.searchParams.get("id");
    const id = parseInt(adminId);

    const admin = await prisma.admin.delete({
      where: {
        id,
      },
    });
    if (admin) {
      return NextResponse.json("success", { status: 200 });
    } else {
      return NextResponse.json("error", { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
