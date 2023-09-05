import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/nextauthOptions'

export async function GetSession () {
  const session = await getServerSession(nextauthOptions);
  return ({ session })
}