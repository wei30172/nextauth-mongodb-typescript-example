import { Account, Profile } from 'next-auth';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user.model';

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
  connectDB()

  // console.log({account, profile})
  const user = await User.findOne({email: profile.email})

  if (user) return true
  
  const newUser = new User({
    name: profile.name,
    email: profile.email,
    image: profile.picture,
    provider: account.provider
  })

  // console.log(newUser)
  await newUser.save();
  
  return true
}

interface GetUserByEmailParams {
  email: string
}

export async function getUserByEmail({
  email
}: GetUserByEmailParams) {
  const user = await User.findOne({email}).select('-password')
  
  if (!user) {
    throw new Error('User does not exist!')
  }

  // console.log({user}) // _id: new ObjectId("64f811a7f737a8d376bdabce")
  return {...user._doc, _id: user._id.toString()}
}