'use server'

import { actionClient } from "@/lib/safe-action"
import { PaymentSchema } from "./types"
import { cookies } from "next/headers"
import { db } from "@/lib/prisma"
import axios from 'axios'


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
            message: 'Você já recebeu seu bônus, por isso sua chave PIX está bloqueada durante 1 dia.',
            errors: null,
          }
        }

        await db.blackList.create({
          data: {
            pixKey,
            plataform: 'A'
          }
        })


        const response = await axios({
          method: 'POST',
          url: 'https://api.syncpay.pro/c1/cashout/api/',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ODM5YzE0YWI1ZTE2NzhmYjAxODFlZjVl'
          },
          data: {
            "api_key": "839c14ab5e1678fb0181ef5e",
            "amount": 0.01,
            "pixKey": keyPix,
            "pixType": pixType,
            "beneficiaryName": name,
            "beneficiaryDocument": document.replace(/[.\-]/g, ''),
            "description": "Pagamento generico",
            "postbackUrl": "https://happy-iron-45.webhook.cool/"
          }
        });


        console.log(response.data)


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