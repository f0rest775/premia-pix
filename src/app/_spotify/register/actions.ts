'use server'

import { actionClient } from "@/lib/safe-action"
import { RegisterAccountSchema } from "./types"
import { cookies } from "next/headers"
import { db } from "@/lib/prisma"

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


      const userFromEmail = await db.user.findUnique({
        where: {
          email
        }
      })

      if (userFromEmail) {

        cookies().set('token', userFromEmail.id, {
          path: '/',
          maxAge: 30 * 24 * 60 * 60
        })

        return {
          success: true,
          message: 'downsell',
          errors: null,
        }
      }

      const user = await db.user.create({
        data: {
          email,
          name,
          document,
          tracking: {
            create: {
              pageUrl: '/spotify/register',
              pageName: 'Pagina de cadastro',
            },
          },
        },
      });

      cookies().set('token', user.id, {
        path: '/',
        maxAge: 30 * 24 * 60 * 60
      })

      return {
        success: true,
        message: null,
        errors: null,
      }
    }
  )