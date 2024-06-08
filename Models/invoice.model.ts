import mongoose, { Document, Schema } from "mongoose";
import { generateNumber } from "@/utils/numberGenerator";
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
    default: generateNumber,
    unique: true,
  },
});

// Define the Invoice schema
const InvoiceSchema = new Schema<IInvoice>({
  number: {
    type: String,
    default: generateNumber,
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
});

InvoiceSchema.set("toJSON", {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString();
    delete returnObject._id;
    delete returnObject.__v;
  },
});

// Create the Invoice model
const Invoice =
  mongoose.models.invoice || mongoose.model<IInvoice>("invoice", InvoiceSchema);

export default Invoice;
