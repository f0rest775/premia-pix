'use server'

import { actionClient } from "@/lib/safe-action"
import { TrackingSchema } from "./types"
import { cookies } from "next/headers"
import { db } from "@/lib/prisma"

export const trackingPage = actionClient
  .schema(TrackingSchema)
  .action(
    async ({
      parsedInput: {
        pageName,
        pageUrl,
      },
    }) => {

      const userId = cookies().get('token')?.value

      if (!userId) {
        return {
          success: false,
          message: 'Usuário não informado.',
          errors: null,
        }
      }


      const user = await db.user.findUnique({
        where: {
          id: userId
        }
      })

      if (!user) {
        return {
          success: false,
          message: 'Usuário não encontrado.',
          errors: null,
        }
      }


      await db.tracking.create({
        data: {
          pageName,
          pageUrl,
          userId
        }
      })

      return {
        success: true,
        message: null,
        errors: null,
      }
    }
  )