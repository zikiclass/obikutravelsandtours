import { NextResponse } from "next/server";
import prisma from "../../../../../../prisma/client";
// GET route to fetch product by ID
export async function GET(req, { params }) {
  const { id } = params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id), // Ensure the id is an integer
      },
      include: {
        productImages: true, // Include related product images
      },
    });

    if (!product) {
      return new Response(JSON.stringify({ error: "Product not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ product }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(
      JSON.stringify({ error: "An error occurred while fetching the product" }),
      {
        status: 500,
      }
    );
  }
}

// POST route to update product by ID

// PUT route to update product by ID
export async function PUT(req, { params }) {
  const { id } = params;
  const {
    title,
    productType,
    price,
    location,
    listedby,
    desc,
    features,
    productFiles,
  } = await req.json(); // Get data from request body

  try {
    // Ensure features is a valid object before updating
    const parsedFeatures = features ? features : {};

    const updatedProduct = await prisma.product.update({
      where: {
        id: parseInt(id), // Ensure ID is correctly parsed
      },
      data: {
        title,
        productType,
        price,
        location,
        listedby,
        desc,
        features: parsedFeatures, // Updated features field
        productFiles: productFiles ? JSON.parse(productFiles) : null, // If product files need to be parsed
      },
    });

    return new Response(JSON.stringify({ updatedProduct }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response(JSON.stringify({ error: "Failed to update product" }), {
      status: 500,
    });
  }
}
