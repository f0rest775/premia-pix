import { sendEMailPix, sendEmailSuccessflyPayment } from "@/lib/nodemailer";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const WebhookSchema = z.object({
  customer: z.object({
    email: z.string().email(),
    full_name: z.string().min(1),
  })
});


export async function POST(
  request: NextRequest
) {

  const body = await request.json();

  const validatedData = WebhookSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json({
      message: 'Formato invalido',
      error: validatedData.error
    }, { status: 404 })
  }

  const email = validatedData.data.customer.email
  const name = validatedData.data.customer.full_name



  await sendEmailSuccessflyPayment(email, name)


  return NextResponse.json({
    message: 'webhook success',
    error: null
  })

}