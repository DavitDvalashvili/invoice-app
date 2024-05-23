import mongoose, { Document, Schema } from "mongoose";
import { generateCustomId } from "@/utils/idGenerator";
import { IInvoice, IClientAddress, IItem } from "@/types/types";

// Define the ClientAddress schema
const ClientAddressSchema = new Schema<IClientAddress>({
  street: String,
  city: String,
  postCode: String,
  country: String,
});

// Define the Item schema
const ItemSchema = new Schema<IItem>({
  name: String,
  quantity: String,
  price: String,
  total: String,
});

// Define the Invoice schema
const InvoiceSchema = new Schema<IInvoice>({
  id: {
    type: String,
    default: generateCustomId,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  paymentDue: {
    type: Date,
    default: Date.now,
  },
  description: String,
  paymentTerms: Number,
  clientName: String,
  clientEmail: String,
  status: {
    type: String,
    default: "draft",
    enum: ["draft", "pending", "paid"],
  },
  clientAddress: ClientAddressSchema,
  items: [ItemSchema],
  total: Number,
});

InvoiceSchema.set("toJSON", {
  transform: (document, returnObject) => {
    delete returnObject._id;
    delete returnObject.__v;
  },
});

// Create the Invoice model
const Invoice = mongoose.model<IInvoice>("invoices", InvoiceSchema);

export default Invoice;
