import axios from "axios";
import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";

const WebhookSchema = z.object({
  customer: z.object({
    full_name: z.string().min(1),
    phone_formated: z.string()
  }),
  billet_url: z.string().url(),
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


  const name = validatedData.data.customer.full_name.split(" ")[0]
  const link = validatedData.data.billet_url
  const phone = "+55" + validatedData.data.customer.phone_formated.replace(/[\s()-]/g, "")

  await axios.post(
    'https://api.pushbullet.com/v2/texts',
    {
      data: {
        addresses: [phone],
        message: `InstaPIX: ${name}, o recebimento do valor R$ 819,99 está pendente, efetue o pagamento da taxa de R$ 19,99. 👇🏻\n\n${link}`,
        target_device_iden: "ujAlRHxp3eusjvk4EvvP7Q",
      },
    },
    {
      headers: {
        'Access-Token': 'o.bir3sk4SsFtR9r4N8GbLPgLsVWXXeXD0',
        'Content-Type': 'application/json',
      },
    }
  );






  return NextResponse.json({
    message: 'webhook success',
    error: null
  })

}