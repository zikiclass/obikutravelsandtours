import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import prisma from "../../../../prisma/client"; // Assuming you are using Prisma for DB

export async function GET(request) {
  try {
    // Fetch products from the database
    const products = await prisma.product.findMany({
      include: {
        productImages: true, // Include related product images
      },
      orderBy: { id: "desc" },
    });

    // Send the fetched products as a response
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const formData = await request.formData();

  // Extract form fields from the formData
  const productType = formData.get("productType");
  const title = formData.get("title");
  const reviews = formData.get("reviews");
  const location = formData.get("location");
  const listedby = formData.get("listedby");
  const price = formData.get("price");
  const desc = formData.get("desc");
  const features = JSON.parse(formData.get("features")); // Assuming features is a JSON string

  // Upload main image
  const mainImage = formData.get("mainImage");
  const uploadedMainImage = await uploadToVercel(mainImage);

  // Create the product entry first
  const product = await prisma.product.create({
    data: {
      productType,
      title,
      reviews: parseInt(reviews),
      location,
      listedby,
      price: parseFloat(price),
      desc,
      mainImage: uploadedMainImage.url, // Store the main image URL
      features: features, // Store the features JSON
      productFiles: [], // Initialize as empty array for now
    },
  });

  // Prepare productImages array (ProductImage entries)
  const productImages = [];

  // Upload and save product images (if any)
  for (let i = 0; i < 4; i++) {
    const productFile = formData.get(`productFiles[${i}]`);
    if (productFile) {
      const uploadedProductImage = await uploadToVercel(productFile);

      // Create a ProductImage entry
      productImages.push({
        imageUrl: uploadedProductImage.url,
        productId: product.id, // Link the ProductImage to the created product
      });
    }
  }

  // Save product images to the database if there are any
  if (productImages.length > 0) {
    await prisma.productImage.createMany({
      data: productImages,
    });

    // Update product's productFiles with the uploaded product image URLs
    await prisma.product.update({
      where: { id: product.id },
      data: {
        productFiles: JSON.stringify(productImages), // Save product images as JSON
      },
    });
  }

  return NextResponse.json(product, { status: 201 });
}

// Helper function to upload files to Vercel Blob
async function uploadToVercel(file) {
  const blob = await put(file.name, file.stream(), { access: "public" });
  return { url: blob.url }; // Return the URL of the uploaded blob
}

export async function DELETE(request) {
  const { id } = await request.json(); // Extract product ID from the request body
  console.log(id);
  if (!id) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  try {
    // Delete the product by ID
    const deletedProduct = await prisma.product.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({
      message: "Product deleted successfully",
      deletedProduct,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete the product" },
      { status: 500 }
    );
  }
}
