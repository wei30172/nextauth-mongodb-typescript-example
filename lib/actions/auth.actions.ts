import { Account, Profile } from 'next-auth'
import { redirect } from 'next/navigation'
import bcrypt from 'bcrypt'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/user.model'
import { generateToken } from '@/lib/utils/token'

interface ExtendedProfile extends Profile {
  picture?: string;
}

interface SignInWithOauthParams {
  account: Account,
  profile: ExtendedProfile
}

export async function signInWithOauth ({
  account,
  profile
}: SignInWithOauthParams) {
  // console.log({account, profile})
  connectDB()

  const user = await User.findOne({email: profile.email})

  if (user) return true
  
  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider
  })

  // console.log(newUser)
  await newUser.save()
  
  return true
}

interface GetUserByEmailParams {
  email: string
}

export async function getUserByEmail({
  email
}: GetUserByEmailParams) {
  connectDB()

  const user = await User.findOne({email}).select('-password')
  
  if (!user) {
    throw new Error('User does not exist!')
  }

  // console.log({user}) // _id: new ObjectId("64f811a7f737a8d376bdabce")
  return {...user._doc, _id: user._id.toString()}
}

export interface SignUpWithCredentialsParams {
  name: string,
  email: string,
  password: string,
}

export async function signUpWithCredentials ({
  name,
  email,
  password
}: SignUpWithCredentialsParams) {
  'use server'
  connectDB()

  try {
    const user = await User.findOne({email})

    if (user) {
      throw new Error('User already exists.')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      name,
      email,
      password: hashedPassword
    })

    // console.log({newUser})
    await newUser.save()

    return { success: true }
  } catch (error) {
    redirect(`/error?error=${(error as Error).message}`)
  }
}