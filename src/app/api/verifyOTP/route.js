import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"; // Adjust the path as needed
import bcrypt from "bcrypt";

// Handle OTP verification
export async function POST(request) {
  try {
    const { email, otp } = await request.json(); // Receive email and OTP from the body

    // Check if email and OTP are provided
    if (!email || !otp) {
      return NextResponse.json(
        { message: "Email and OTP are required" },
        { status: 400 }
      );
    }

    // Retrieve user data from the database based on email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check if the OTP matches the stored `verifyCode`
    if (user.verifyCode !== otp) {
      return NextResponse.json({ message: "Invalid OTP" }, { status: 400 });
    }

    // Update the user's verifyCode field to 'verified' after successful match
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        verifyCode: "verified", // Marking the user as verified
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
