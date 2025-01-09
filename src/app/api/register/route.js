import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client";
import { userSchema } from "../../validationSchema";
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
    const validation = userSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation error", errors: validation.error.format() },
        { status: 400 }
      );
    }

    // Check if email is already registered
    const checkEmail = await prisma.user.findUnique({
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
    const addUser = await prisma.user.create({
      data: {
        fullname: body.fullname,
        email: body.email,
        phone: body.phoneNumber,
        dateofbirth: body.dateofBirth,
        verifyCode: body.randomCode,
        referrercode: body.referrercode,
        password: hashedPassword,
        date: date_created,
      },
    });

    return NextResponse.json(addUser, { status: 201 });
  } catch (err) {
    console.error("Prisma Client Error:", err);
  }
}

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const searchQuery = searchParams.get("search") || ""; // Default to an empty string if search is not provided
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 15;

    console.log("searchQuery:", searchQuery); // Log the search query

    // Construct where clause dynamically based on the search query
    const whereClause = searchQuery
      ? {
          OR: [
            {
              fullname: {
                contains: searchQuery, // Case-insensitive query for fullname
                // Case-insensitive option
              },
            },
            {
              email: {
                contains: searchQuery, // Case-insensitive query for email
                // Case-insensitive option
              },
            },
          ],
        }
      : {}; // If no search, empty where clause

    console.log("whereClause:", whereClause); // Log the where clause

    const users = await prisma.user.findMany({
      where: whereClause,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { id: "desc" },
    });

    const totalUsers = await prisma.user.count({
      where: whereClause,
    });

    return NextResponse.json({ users, totalUsers }, { status: 200 });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const userId = req.nextUrl.searchParams.get("id");
    const id = parseInt(userId);

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
