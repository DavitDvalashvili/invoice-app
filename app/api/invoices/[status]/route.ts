import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";

export const POST = async (request: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const status = pathname.split("/").pop();

  try {
    await connectDB();
    const invoiceBody = await request.json();

    let newInvoice;
    let message;

    if (status === "draft") {
      newInvoice = new Invoice(invoiceBody);
      message = "Draft created successfully ";
    } else if (status === "all") {
      newInvoice = new Invoice({ ...invoiceBody, status: "pending" });
      message = "Invoice created successfully";
    } else {
      return NextResponse.json(
        { message: "Invalid status Api" },
        { status: 400 }
      );
    }

    await newInvoice.save();

    return NextResponse.json({ message }, { status: 201 });
  } catch (error: any) {
    console.error(`Error creating invoice: ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (request: any, response: any) => {
  const { status } = await response.params;
  let invoice;

  try {
    await connectDB();

    // If status is "all", fetch all invoices from the database
    if (status == "all") {
      invoice = await Invoice.find();
    } else {
      // Otherwise, fetch invoices with the specified status
      invoice = await Invoice.find({ status });
    }
    return NextResponse.json(invoice, { status: 200 });
  } catch (error: any) {
    // Log any errors that occur during the fetch operation and Return an error message with a 500 Internal Server Error status
    console.error(`Error getting invoices ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
