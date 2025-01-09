import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";

export async function POST(request) {
  try {
    const body = await request.json();

    // Check if email is already registered
    const checkEmail = await prisma.user.findUnique({
      where: {
        email: body.forgotEmail,
      },
    });

    if (!checkEmail) {
      return NextResponse.json({ message: "Email not found" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: body.forgotEmail,
      },
      data: {
        forgotCode: body.forgotCode,
      },
    });

    return NextResponse.json(updatedUser, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}

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
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(body.email, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const userId = req.nextUrl.searchParams.get("id");
    const id = parseInt(userId);

    await prisma.$transaction([
      prisma.order.deleteMany({
        where: { userId: id },
      }),
      prisma.billing.deleteMany({
        where: { userId: id },
      }),
    ]);

    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    if (user) {
      return NextResponse.json("success", { status: 200 });
    } else {
      return NextResponse.json("error", { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
