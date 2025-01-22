"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/maultrap";

export async function onboardUser(prevState: any, formData: FormData) {
  const session = await requireUser();

  const submission = parseWithZod(formData, {
    schema: onboardingSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.user.update({
    where: {
      id: session.user?.id,
    },
    data: {
      firstName: submission.value.firstName,
      lastName: submission.value.lastName,
      address: submission.value.address,
    },
  });

  return redirect("/dashboard");
}

export async function CreateInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.invoice.create({
    data: {
      clientAddress: submission.value.clientAddress,
      clientName: submission.value.clientName,
      clientEmail: submission.value.clientEmail,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      formAddress: submission.value.formAddress,
      formName: submission.value.formName,
      formEmail: submission.value.formEmail,
      invoiceNumber: submission.value.invoiceNumber,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      note: submission.value.note,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
      userId:session.user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Subham",
  };

  emailClient.send({
    from: sender,
    to:[{email:"subhamwworks@gmail.com"}],
    subject: "New Invoice ",
    text:"We Have a New Invoice For You!",
    category:"Invoice test",

  });
  return redirect("/dashboard/invoices");
}


//https://youtu.be/AH3xlNuui_A?t=20674