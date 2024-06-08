import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";

export const GET = async (request: any, response: any) => {
  const { id } = await response.params;

  try {
    await connectDB();
    let invoice = await Invoice.find({ id });

    if (invoice.length == 0) {
      return NextResponse.json(
        { message: "Invoice Not Found" },
        { status: 404 }
      );
    } else {
      return NextResponse.json(invoice, { status: 200 });
    }
  } catch (error: any) {
    console.error(`Error getting invoices ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const PUT = async (request: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const invoiceId = pathname.split("/").pop();

  try {
    await connectDB();

    const updatedInvoice = await Invoice.findOneAndUpdate(
      { id: invoiceId },
      request.body,
      { new: true } // Return the updated document
    );

    console.log("Updated Invoice:", updatedInvoice); // Log the updated document

    if (!updatedInvoice) {
      console.error(`Invoice with ID ${invoiceId} not found`);
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Invoice updated successfully", updatedInvoice },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error updating invoice: ${error.message}`);
    return NextResponse.json(
      { message: `Internal server error` },
      { status: 500 }
    );
  }
};
