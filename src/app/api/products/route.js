// app/api/products/route.js
import { NextResponse } from "next/server"; // Import NextResponse
import prisma from "../../../../prisma/client"; // Ensure you import the correct prisma client

export async function GET() {
  try {
    // Fetch the products from the database
    const products = await prisma.product.findMany({
      include: {
        productImages: true, // Include related product images
      },
    });

    // Return the products as JSON
    return NextResponse.json(products); // Correct way to return JSON in Next.js 13
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Failed to fetch products", error: error.message },
      { status: 500 } // Set the response status to 500 for errors
    );
  }
}
