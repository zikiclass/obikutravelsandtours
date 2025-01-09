import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";
export async function POST(req) {
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

    // Update the user's verifyCode field to 'verified' after successful match
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        verifyCode: "verified",
      },
    });

    // Respond with success message
    return NextResponse.json(
      { message: "OTP verified successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return NextResponse.json(
      { message: "An error occurred", error: err.message },
      { status: 500 }
    );
  }
}
