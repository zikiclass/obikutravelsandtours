import { NextResponse } from "next/server";
import prisma from "../../../../../prisma/client";

export async function GET(request) {
  try {
    const product = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    if (product) {
      return NextResponse.json(product, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json("status", { status: 500 });
  }
}
