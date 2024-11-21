'use server'

import { actionClient } from "@/lib/safe-action"
import { PaymentSchema } from "./types"
import { cookies } from "next/headers"

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

      if (pixKey) {
        cookies().set('user_pix_key', pixKey, {
          path: '/',
          maxAge: 7 * 24 * 60 * 60
        })
      }







      return {
        success: true,
        message: null,
        errors: null,
      }
    }
  )