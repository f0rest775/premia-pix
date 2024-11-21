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
        maxAge: 7 * 24 * 60 * 60
      })

      cookies().set('user_created', String(new Date()), {
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      })

      cookies().set('user_document', document, {
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      })

      cookies().set('user_email', email, {
        path: '/',
        maxAge: 7 * 24 * 60 * 60
      })


      return {
        success: true,
        message: null,
        errors: null,
      }

    }
  )