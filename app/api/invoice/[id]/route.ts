import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";

export const GET = async (request: any, response: any) => {
  const { id } = await response.params;

  try {
    await connectDB();
    let invoice = await Invoice.findById(id);

    if (!invoice) {
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

export const POST = async (request: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const id = pathname.split("/").pop();

  try {
    await connectDB();

    const body = await request.json();

    const updatedInvoice = await Invoice.findByIdAndUpdate(id, body);

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
    console.error(`Error updating invoice: ${error.message}`);
    return NextResponse.json(
      { message: `Internal server error` },
      { status: 500 }
    );
  }
};

export const DELETE = async (request: any) => {
  const url = new URL(request.url);
  const pathname = url.pathname;
  const id = pathname.split("/").pop();

  try {
    await connectDB();
    const deletedInvoice = await Invoice.findByIdAndDelete(id);

    if (!deletedInvoice) {
      console.error(`Invoice with ID ${id} not found`);
      return NextResponse.json(
        { message: "Invoice not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Invoice deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(`Error deleting invoice: ${error.message}`);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
