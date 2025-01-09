import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
import { adminSchema } from "../../../validationSchema";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate passwords
    if (body.password !== body.confirmPassword) {
      return NextResponse.json(
        { message: "Password mismatch" },
        { status: 400 }
      );
    }

    // Validate input data
    const validation = adminSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation error", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const checkEmail = await prisma.admin.findUnique({
      where: {
        email: body.email,
      },
    });

    if (checkEmail) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const date_created = new Date();
    // Create new user
    const addAdmin = await prisma.admin.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        password: hashedPassword,
        date: date_created,
      },
    });

    return NextResponse.json(addAdmin, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}

export async function GET(request) {
  try {
    const admin = await prisma.admin.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (admin) {
      return NextResponse.json(admin, { status: 200 });
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
