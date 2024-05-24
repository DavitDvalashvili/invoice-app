import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export const POST = async (request: Request): Promise<NextResponse> => {
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
      message = "Invoice created successfully width status draft";
    } else {
      newInvoice = new Invoice({ ...invoiceBody, status: "pending" });
      message = "Invoice created successfully with status pending";
    }

    await newInvoice.save();

    return NextResponse.json({ message }, { status: 201 });
  } catch (error: any) {
    console.error(`Error creating invoice: ${error.message}`);

    const status = error.name === "ValidationError" ? 400 : 500;
    return NextResponse.json({ message: error.message }, { status });
  }
};

export const GET = async (
  request: Request,
  response: Response
): Promise<NextResponse> => {
  // Parse the URL from the request to extract the pathname
  const url = new URL(request.url);
  const pathname = url.pathname;
  // Extract the status parameter from the URL pathname
  const status = pathname.split("/").pop();

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
    console.log(`Error getting invoices ${error.message}`);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
};
