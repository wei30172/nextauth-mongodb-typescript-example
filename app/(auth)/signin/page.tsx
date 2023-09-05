import SignInForm from '@/components/form/SignInForm'

interface SignInPageProps {
  searchParams: {
    callbackUrl: string
  }
}

const SignInPage: React.FC<SignInPageProps> = ({ searchParams: { callbackUrl }}) => {
  // console.log({props})

  return (
    <div className='w-full'>
      <SignInForm callbackUrl={callbackUrl || '/'} />
    </div>
  )
}

export default SignInPage