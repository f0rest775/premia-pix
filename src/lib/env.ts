import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    APP_URL: z.string().url(),
  },
  client: {},
  shared: {
    NEXT_PUBLIC_URLS: z.string(),
    NEXT_PUBLIC_CHECKOUT: z.enum(['perfectpay', 'plataform']),
    NEXT_PUBLIC_USER: z.enum(['A', 'H'])
  },
  runtimeEnv: {
    APP_URL: process.env.APP_URL,
    NEXT_PUBLIC_URLS: process.env.NEXT_PUBLIC_URLS,
    NEXT_PUBLIC_CHECKOUT: process.env.NEXT_PUBLIC_CHECKOUT,
    NEXT_PUBLIC_USER: process.env.NEXT_PUBLIC_USER

  },
  emptyStringAsUndefined: true,
})