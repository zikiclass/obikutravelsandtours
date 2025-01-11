import { NextResponse } from "next/server"; // Import NextResponse
import prisma from "../../../../../prisma/client"; // Assuming you're using Prisma as your ORM

export async function GET(req) {
  try {
    const url = new URL(req.url); // Create URL from the incoming request
    const searchParams = new URLSearchParams(url.search); // Parse query string

    const id = searchParams.get("id"); // Get the `id` from the query string

    if (!id) {
      return NextResponse.json(
        { message: "Product ID is required" },
        { status: 400 }
      );
    }

    // Fetch the product with the given id
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        productImages: true, // Including related images
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 }); // Return the product data
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product", error: error.message },
      { status: 500 }
    );
  }
}
