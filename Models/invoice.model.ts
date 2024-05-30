import mongoose, { Document, Schema } from "mongoose";
import { generateCustomId } from "@/utils/idGenerator";
import { IInvoice, IItem } from "@/types/types";

// Define the Item schema
const ItemSchema = new Schema({
  itemName: String,
  itemQuantity: {
    type: Number,
    default: undefined,
  },
  itemPrice: {
    type: Number,
    default: undefined,
  },
  itemTotal: Number,
  itemId: {
    type: String,
    default: generateCustomId,
    unique: true,
  },
});

// Define the Invoice schema
const InvoiceSchema = new Schema<IInvoice>({
  id: {
    type: String,
    default: generateCustomId,
    unique: true,
  },
  street: String,
  city: String,
  postCode: String,
  country: String,
  clientName: String,
  clientEmail: String,
  clientStreet: String,
  clientCity: String,
  clientPostCode: String,
  clientCountry: String,
  invoiceDate: {
    type: Date,
    default: Date.now,
  },
  paymentTerms: Number,
  description: String,
  status: {
    type: String,
    default: "draft",
  },
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
const Invoice =
  mongoose.models.invoice || mongoose.model<IInvoice>("invoice", InvoiceSchema);

export default Invoice;
