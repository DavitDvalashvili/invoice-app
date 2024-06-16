import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";

// GET handler to retrieve an invoice by its ID
export const GET = async (request: any, response: any) => {
  const { id } = await response.params;

  try {
    await connectDB();
    let invoice = await Invoice.findById(id);

    if (!invoice) {
      // If the invoice is not found, return a 404 response
      return NextResponse.json(
        { message: "Invoice Not Found" },
        { status: 404 }
      );
    } else {
      // Return the invoice data if found
      return NextResponse.json(invoice, { status: 200 });
    }
  } catch (error: any) {
    // Handle any errors during the operation
    console.error(`Error getting invoices ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// POST handler to update an existing invoice
export const POST = async (request: any) => {
  // Extract the invoice ID from the URL
  const url = new URL(request.url);
  const pathname = url.pathname;
  const id = pathname.split("/").pop();

  try {
    await connectDB();

    // Parse the request body
    const body = await request.json();

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, body);

    // Return 404 if invoice is not found
    if (!updatedInvoice) {
      console.error(`Invoice not found`);
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Invoice updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle database connection or update errors
    console.error(`Error updating invoice: ${error.message}`);
    return NextResponse.json(
      { message: `Internal server error` },
      { status: 500 }
    );
  }
};

// DELETE handler to delete an invoice by its ID
export const DELETE = async (request: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const id = pathname.split("/").pop();

  try {
    await connectDB();
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    // Return 404 if invoice is not found
    if (!deletedInvoice) {
      console.error(`Invoice with ID ${id} not found`);
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    // Return success message if invoice is deleted successfully
    return NextResponse.json(
      { message: "Invoice deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle database connection or deletion errors
    console.error(`Error deleting invoice: ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
