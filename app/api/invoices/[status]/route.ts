import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";

// POST handler to create a new invoice or draft
export const POST = async (request: any) => {
  // Extract status from URL path
  const url = new URL(request.url);
  const pathname = url.pathname;
  const status = pathname.split("/").pop();

  try {
    await connectDB();
    const invoiceBody = await request.json();

    let newInvoice;
    let message;

    if (status === "draft") {
      // Create a new draft invoice
      newInvoice = new Invoice(invoiceBody);
      message = "Draft created successfully ";
    } else if (status === "all") {
      // Create a new invoice with status "pending"
      newInvoice = new Invoice({ ...invoiceBody, status: "pending" });
      message = "Invoice created successfully";
    } else {
      // Return 400 if status is invalid
      return NextResponse.json(
        { message: "Invalid status Api" },
        { status: 400 }
      );
    }

    await newInvoice.save();

    return NextResponse.json({ message }, { status: 201 });
  } catch (error: any) {
    // Handle database connection or creation errors
    console.error(`Error creating invoice: ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (request: any, response: any) => {
  // Extract status from request parameters
  const { status } = await response.params;
  let invoice;

  try {
    await connectDB();

    if (status == "all") {
      // Retrieve all invoices
      invoice = await Invoice.find();
    } else {
      // Retrieve invoices based on specified status
      invoice = await Invoice.find({ status });
    }
    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    // Handle database connection or retrieval errors
    console.error(`Error getting invoices ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
