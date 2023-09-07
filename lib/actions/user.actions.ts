import { getServerSession } from 'next-auth'
import { nextauthOptions } from '@/lib/nextauthOptions'
import User from '@/lib/models/user.model'
import { redirect } from 'next/navigation'

export async function getSession () {
  const session = await getServerSession(nextauthOptions)
  return ({ session })
}

interface UpdateUserProfileParams {
  name?: string,
  password?: string,
  confirmPassword?: string
}

export async function updateUserProfile ({
  name
}: UpdateUserProfileParams) {
  'use server'
  
  const session = await getServerSession(nextauthOptions)

  if (!session) {
    return { error: 'Unauthorization!' }
  }

  try {
    const user = await User.findByIdAndUpdate(session?.user?._id, {
      name
    }, { new: true }).select('-password')

    if (!user) {
      return { error: 'User does not exist!' }
    }

    return { success: true }
  } catch (error) {
    return { error: `Failed to update: ${(error as Error).message}.` }
  }
}

