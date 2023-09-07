import { Account, Profile } from 'next-auth'
import bcrypt from 'bcrypt'
import connectDB from '@/lib/mongodb'
import User from '@/lib/models/user.model'
import { generateToken } from '@/lib/token'

export type ActionResponse = {
  success?: boolean
  error?: string
}

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
    return { error: 'User does not exist!' }
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

    if (user){
      return { error: 'User already exists.' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
  
    const newUser = {
      name,
      email,
      password: hashedPassword
    }

    // const token = generateToken({ user: newUser })
    // console.log({token})

    await new User(newUser).save()
  
    return { success: true }
  } catch (error) {
    return { error: `Failed to sign up: ${(error as Error).message}.` }
  }
}