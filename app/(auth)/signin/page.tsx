import SignInForm from '@/components/form/SignInForm'

interface SignInPageProps {
  searchParams: {
    callbackUrl: string
  }
}

export default function SignInPage({
  searchParams: { callbackUrl }
}: SignInPageProps) {
  // console.log({props})
  return (
    <div className='w-full'>
      <SignInForm callbackUrl={callbackUrl || '/'} />
    </div>
  )
}