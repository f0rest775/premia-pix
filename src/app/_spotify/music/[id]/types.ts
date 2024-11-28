import { z } from 'zod'

export const TrackingSchema = z
  .object({
    pageUrl: z.string().min(1),
    pageName: z.string().min(1)
  })
