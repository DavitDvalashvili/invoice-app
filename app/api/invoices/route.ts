import { NextResponse } from "next/server";
import Invoice from "@/Models/invoice.model";
import connectDB from "@/config/db";

export const POST = async (request: Request): Promise<NextResponse> => {
  try {
    const InvoiceBody = await request.json();
    await connectDB();
    const newInvoice = new Invoice(InvoiceBody);
    await newInvoice.save();

    return new NextResponse(
      JSON.stringify({
        message: "Invoice created successfully",
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error(`Error creating invoice: ${error.message}`);

    const status = error.name === "ValidationError" ? 400 : 500;
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status,
    });
  }
};
