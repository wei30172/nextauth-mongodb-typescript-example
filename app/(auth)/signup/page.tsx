import SignUpForm from '@/components/form/signup-form'
import { signUpWithCredentials } from '@/lib/actions/auth.actions';

interface SignUpPageProps {
  searchParams: {
    callbackUrl: string
  }
}

export default function SignUpPage({
  searchParams: { callbackUrl }
}: SignUpPageProps) {
  // console.log({props})
  return (
    <div className='w-full'>
      <SignUpForm
        callbackUrl={callbackUrl || '/'}
        signUpWithCredentials={signUpWithCredentials}
      />
    </div>
  )
}