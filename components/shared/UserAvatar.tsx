'use client'

import { useSession } from 'next-auth/react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'

function UserAvatar() {
  const { data: session, update } = useSession()

  return (
    <div className='mb-4'>
      {session?.user.image && 
        <Avatar className='mx-auto'>
          <AvatarImage src={session?.user.image} alt='user avatar' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      }
      <p className='w-full text-center'>{session?.user.name}</p>
    </div>
  )
}

export default UserAvatar