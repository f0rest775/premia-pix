'use server'

import { actionClient } from "@/lib/safe-action"
import { PaymentSchema } from "./types"

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




      return {
        success: true,
        message: null,
        errors: null,
      }
    }
  )