"use server";

import { requireUser } from "./utils/hooks";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema, onboardingSchema } from "./utils/zodSchemas";
import prisma from "./utils/db";
import { redirect } from "next/navigation";
import { emailClient } from "./utils/mailtrap";
import { formatCurrency } from "./utils/formatCurrency";

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
      userId: session.user?.id,
    },
  });

  const sender = {
    email: "hello@demomailtrap.com",
    name: "Subham",
  };

  emailClient.send({
    from: sender,
    to: [{ email: "subhamwworks@gmail.com" }],
    template_uuid: "f7c9c618-1258-41ed-a4c8-890135e1920f",
    template_variables: {
      Client_Name: submission.value.clientName,
      invoicenumber: submission.value.invoiceNumber,
      duedate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalamount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });
  return redirect("/dashboard/invoices");
}

export async function editInvoice(prevState: any, formData: FormData) {
  const session = await requireUser();
  const submission = parseWithZod(formData, {
    schema: invoiceSchema,
  });
  if (submission.status !== "success") {
    return submission.reply();
  }
  const data = await prisma.invoice.update({
    where: {
      id: formData.get("id") as string,
      userId: session.user?.id,
    },
    data: {
      clientAddress: submission.value.clientAddress,
      clientEmail: submission.value.clientEmail,
      clientName: submission.value.clientName,
      currency: submission.value.currency,
      date: submission.value.date,
      dueDate: submission.value.dueDate,
      formAddress: submission.value.formAddress,
      formEmail: submission.value.formEmail,
      formName: submission.value.formName,
      invoiceItemDescription: submission.value.invoiceItemDescription,
      invoiceItemQuantity: submission.value.invoiceItemQuantity,
      invoiceItemRate: submission.value.invoiceItemRate,
      invoiceName: submission.value.invoiceName,
      invoiceNumber: submission.value.invoiceNumber,
      status: submission.value.status,
      total: submission.value.total,
      note: submission.value.note,
    },
  });
  const sender = {
    email: "hello@demomailtrap.com",
    name: "Subham",
  };

  emailClient.send({
    from: sender,
    to: [{ email: "subhamwworks@gmail.com" }],
    template_uuid: "320f205e-f4e6-4084-86ea-a8236d60dbc5",
    template_variables: {
      Client_Name: submission.value.clientName,
      invoicenumber: submission.value.invoiceNumber,
      duedate: new Intl.DateTimeFormat("en-US", {
        dateStyle: "long",
      }).format(new Date(submission.value.date)),
      totalamount: formatCurrency({
        amount: submission.value.total,
        currency: submission.value.currency as any,
      }),
      invoiceLink: `http://localhost:3000/api/invoice/${data.id}`,
    },
  });
  return redirect("/dashboard/invoices");
}
