import { env } from "@/lib/env";
import { db } from "@/lib/prisma";
import { mapWebhookStatusOrbitaPay } from "@/lib/webhook";
import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const PaymentWebhookSchema = z.object({
  data: z.object({
    id: z.number(),
    status: z.enum(['processing', 'authorized', 'paid', 'refunded', 'waiting_payment', 'refused', 'chargedback', 'canceled', 'in_protest', 'partially_paid']),
  }),
});


export async function POST(
  request: NextRequest
) {

  const body = await request.json();

  const validatedData = PaymentWebhookSchema.safeParse(body);

  if (!validatedData.success) {
    return NextResponse.json({
      message: 'Formato invalido',
      error: validatedData.error
    }, { status: 404 })
  }

  const externalId = validatedData.data.data.id.toString()
  const status = validatedData.data.data.status


  const sale = await db.sale.findUnique({
    where: {
      externalId
    }
  })

  if (!sale) {
    return NextResponse.json({
      message: 'Venda não encontrada.',
      error: 'Sale not found'
    }, { status: 404 })
  }


  await db.sale.update({
    where: {
      externalId
    },
    data: {
      status: mapWebhookStatusOrbitaPay(status),
      approvedAt: status === 'paid' || status === 'authorized' ? new Date() : null,
      refundedAt: status === 'canceled' || status === 'chargedback' || status === 'refunded' || status === 'refused' ? new Date() : null
    }
  })

  if (status === 'paid' || status === 'authorized') {
    if (env.URL_PUSH_CUT_APPROVED) {
      axios.get(env.URL_PUSH_CUT_APPROVED)
    }
  }

  // if (status === 'paid' || status === 'authorized') {
  //   await fetch(`${env.APP_URL}/api/send-mail/pending`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       customer: {
  //         email,
  //         full_name: name
  //       }
  //     })
  //   })
  // }



  return NextResponse.json({
    message: 'webhook success',
    error: null
  })

}