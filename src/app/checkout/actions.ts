'use server'
import { actionClient } from "@/lib/safe-action";
import { FormSchema } from "./types";
import { db } from "@/lib/prisma";
import { customAlphabet } from 'nanoid'
import { createPaymentPix } from "@/http/create-sale";
import { mapWebhookStatusOrbitaPay } from "@/lib/webhook";


export const createSale = actionClient
  .schema(FormSchema)
  .action(
    async ({ parsedInput: {
      document,
      email,
      name,
      orderBump
    } }) => {
      try {
        const path = customAlphabet(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstyvwxyz',
          20
        )()

        const amount = orderBump ? 2998 : 1999

        const sale = await db.sale.create({
          data: {
            amount,
            path
          }
        })

        const result = await createPaymentPix({
          clientDocument: document.replaceAll(".", "").replace("-", ""),
          clientEmail: email.split("@")[0] + "@premiapix.com",
          clientName: name,
          amount,
          token: 'sk_live_aErQfPNHjonx4Is6SciCLwCJk3VWKlEQaOxq81MX6C'
        })

        if (!result.ok) {
          await db.sale.update({
            where: {
              id: sale.id
            },
            data: {
              status: 'ERROR'
            }
          })

          return {
            success: false,
            message: 'Erro ao gerar QR Pix.',
            data: null,
          }
        }

        await db.sale.update({
          where: {
            id: sale.id,
          },
          data: {
            externalId: String(result.id),
            brCode: result.pix.qrcode,
            status: mapWebhookStatusOrbitaPay(result.status),
          },
        })

        return {
          success: true,
          message: 'Pagamento criado com sucesso.',
          data: { saleId: sale.path },
        }


      } catch (error) {

        return {
          success: false,
          message: 'Erro desconhecido, tente novamente mais tarde.',
          data: null,
        }
      }



    }
  )