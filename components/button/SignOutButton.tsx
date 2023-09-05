'use client'

import { Button } from '@/components/ui/button'

const SignOutButton = () => {
  const signout = async () => {
    console.log('sign out')
  };

  return (
    <Button onClick={signout} variant='destructive'>
      Sign Out
    </Button>
  )
}

export default SignOutButton