import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { nextauthOptions } from '@/lib/nextauthOptions'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/user.model'

export async function getUserSession () {
  const session = await getServerSession(nextauthOptions)
  return ({ session })
}

export interface UpdateUserProfileParams {
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
    throw new Error('Unauthorization!')
  }

  connectDB()
    
  try {
    const user = await User.findByIdAndUpdate(session?.user?._id, {
      name
    }, { new: true }).select('-password')
  
    if (!user) {
      throw new Error('User does not exist!')
    }
  
    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}

