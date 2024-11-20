import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {

  cookies().delete('user_document')
  cookies().delete('user_name')
  cookies().delete('user_created')

  return NextResponse.redirect('/spotify/register')
}