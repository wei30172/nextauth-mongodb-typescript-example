import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'

interface GoogleSignInButtonProps {
  children: React.ReactNode
  callbackUrl: string
}
const GoogleSignInButton = ({
  children,
  callbackUrl
}: GoogleSignInButtonProps) => {

  const loginWithGoogle = async () => {
    await signIn("google", { callbackUrl })
  }

  return (
    <Button onClick={loginWithGoogle} className="w-full">
      {children}
    </Button>
  )
}

export default GoogleSignInButton