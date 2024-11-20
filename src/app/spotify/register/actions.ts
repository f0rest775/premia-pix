'use server'

import { actionClient } from "@/lib/safe-action"
import { RegisterAccountSchema } from "./types"
import { cookies } from "next/headers"

export const registerAccount = actionClient
  .schema(RegisterAccountSchema)
  .action(
    async ({
      parsedInput: {
        document,
        email,
        name
      },
    }) => {

      cookies().set('user_name', name, {
        path: '/',
      })

      cookies().set('user_created', String(new Date()), {
        path: '/',
      })

      cookies().set('user_document', document, {
        path: '/',
      })

      cookies().set('user_email', email, {
        path: '/',
      })


      return {
        success: true,
        message: null,
        errors: null,
      }

    }
  )