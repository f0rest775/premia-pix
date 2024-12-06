import { env } from "@/lib/env"

interface PaymentPixRequest {
  clientEmail: string
  clientName: string
  clientDocument: string
  token: string
  amount: number
}

interface PaymentPixResponse {
  ok: boolean
  status:
  | 'processing'
  | 'authorized'
  | 'paid'
  | 'refunded'
  | 'waiting_payment'
  | 'refused'
  | 'chargedback'
  | 'canceled'
  | 'in_protest'
  | 'partially_paid'
  pix: {
    qrcode: string
  }
  id: number
}

export async function createPaymentPix({
  clientEmail,
  clientName,
  clientDocument,
  token,
  amount
}: PaymentPixRequest): Promise<
  PaymentPixResponse | { ok: false; error: string }
> {
  try {
    const response = await fetch(
      'https://api.dashboard.orbitapay.com.br/v1/transactions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:
            'Basic ' + Buffer.from(`${token}:x`).toString('base64'),
        },
        body: JSON.stringify({
          amount,
          paymentMethod: 'pix',
          customer: {
            name: clientName,
            email: clientEmail,
            document: {
              type: 'cpf',
              number: clientDocument
            }
          },
          items: [
            {
              title: 'Ebook vendas PRO',
              unitPrice: amount,
              quantity: 1,
              tangible: false,
            },
          ],
          postbackUrl: `${env.APP_URL}/api/postback`,
        }),
      }
    )

    if (!response.ok) {
      const errorData: any = await response.json()
      throw new Error(`Erro ${response.status}: ${errorData.message}`)
    }

    const data = (await response.json()) as PaymentPixResponse

    return { ...data, ok: true }
  } catch (err: any) {
    return { ok: false, error: `Erro ao criar pagamento: ${err.message}` }
  }
}