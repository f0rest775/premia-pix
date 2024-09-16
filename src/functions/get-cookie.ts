import { getCookie, hasCookie } from 'cookies-next'
import type { CookiesFn } from 'cookies-next/lib/types'

export async function getData(key: string) {
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }

  const data = getCookie(key, { cookies: cookieStore })

  return data
}


export async function hasCookieT(key: string) {
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }

  const data = hasCookie(key, { cookies: cookieStore })

  return data
}