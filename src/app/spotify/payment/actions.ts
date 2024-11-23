'use server'

import { actionClient } from "@/lib/safe-action"
import { PaymentSchema } from "./types"
import { cookies } from "next/headers"
import { db } from "@/lib/prisma"


export const createPayment = actionClient
  .schema(PaymentSchema)
  .action(
    async ({
      parsedInput: {
        document,
        pixType,
        pixKey,
        name
      },
    }) => {

      if (!pixKey) {
        return {
          success: false,
          message: 'Chave PIX não informada.',
          errors: null
        }
      }

      try {

        let keyPix
        if (pixType === 'CPF') {
          keyPix = pixKey.replace(/[.\-]/g, '')
        } else {
          keyPix = pixKey
        }


        const sanitizedPixKey = pixKey.replace(/[.\-]/g, '')

        cookies().set('user_pix_key', pixKey, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60
        })


        const pix = await db.blackList.findUnique({
          where: {
            pixKey
          }
        })

        if (pix) {
          return {
            success: false,
            message: 'Você já recebeu seu bonus, por isso sua chave PIX está bloqueada durante 7 dias.',
            errors: null,
          }
        }

        await db.blackList.create({
          data: {
            pixKey,
            pixReceived: true
          }
        })


        await fetch('https://api.syncpay.pro/c1/cashout/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'ODM5YzE0YWI1ZTE2NzhmYjAxODFlZjVl',
          },
          body: JSON.stringify({
            api_key: '839c14ab5e1678fb0181ef5e',
            amount: 0.01,
            pixKey: sanitizedPixKey,
            pixType,
            beneficiaryName: name,
            beneficiaryDocument: document.replace(/[.\-]/g, ''),
            postbackUrl: 'https://happy-iron-45.webhook.cool'
          })
        })

        return {
          success: true,
          message: null,
          errors: null,
        }

      } catch (error) {
        console.error('Payment creation error:', error)
        return {
          success: false,
          message: 'An unexpected error occurred',
          errors: error instanceof Error ? error.message : null,
        }
      }
    }
  )