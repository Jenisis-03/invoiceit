import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(2, "First Name is Required"),
  lastName: z.string().min(2, "Last Name is Required"),
  address: z.string().min(2, "Address is Required"),
});

export const invoiceSchema = z.object({
  invoiceName: z.string().min(1, "Invoice Name is Required"),
  total: z.number().min(1, "Total Amount is Required"),
  status: z.enum(["PAID", "PENDING"]).default("PENDING"),
  date: z.string().min(1, "Date is Required"),
  dueDate: z.number().min(0, "Due Date is Required"),
  formName: z.string().min(1, "Your Name is Required"),
  formEmail: z.string().email("Invalid Email Address"),
  formAddress: z.string().min(1, "Your Address is Required"),
  clientName: z.string().min(1, "Your Client Name is Required"),
  clientEmail: z.string().email("Invalid Email Address"),
  clientAddress: z.string().min(1, "Your Client Address is Required"),
  currency: z.string().min(1, "Currency is Required"),
  invoiceNumber: z.number().min(1, "Minimum invoice number of 1"),
  note: z.string().optional(),
  invoiceItemDescription: z.string().min(1, "Description is required"),
  invoiceItemQuantity: z.number().min(1, "Quantity is Required"),
  invoiceItemRate: z.number().min(1, "Rate minimum 1 "),
});
