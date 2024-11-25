import { getCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

export async function getCookies(cookie: string) {
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }

  const cookieData = getCookie(cookie, { cookies: cookieStore })

  return cookieData
}