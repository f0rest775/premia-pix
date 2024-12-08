import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
    URL_PUSH_CUT_PENDING: z.string().url().optional(),
    URL_PUSH_CUT_APPROVED: z.string().url().optional(),
    EXTERNAL_URL: z.string().url()
  },
  client: {},
  shared: {
    NEXT_PUBLIC_URLS: z.string(),
    NEXT_PUBLIC_CHECKOUT: z.enum(['perfectpay', 'plataform']),
    NEXT_PUBLIC_USER: z.enum(['A', 'H'])
  },
  runtimeEnv: {
    EXTERNAL_URL: process.env.EXTERNAL_URL,
    APP_URL: process.env.APP_URL,
    URL_PUSH_CUT_PENDING: process.env.URL_PUSH_CUT_PENDING,
    URL_PUSH_CUT_APPROVED: process.env.URL_PUSH_CUT_APPROVED,
    NEXT_PUBLIC_URLS: process.env.NEXT_PUBLIC_URLS,
    NEXT_PUBLIC_CHECKOUT: process.env.NEXT_PUBLIC_CHECKOUT,
    NEXT_PUBLIC_USER: process.env.NEXT_PUBLIC_USER
  },
  emptyStringAsUndefined: true,
})