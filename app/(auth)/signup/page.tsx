import SignUpForm from '@/components/form/SignUpForm'

interface SignUpPageProps {
  searchParams: {
    callbackUrl: string
  }
}

const SignUpPage: React.FC<SignUpPageProps> = ({ searchParams: { callbackUrl }}) => {
  // console.log({props})
  
  return (
    <div className='w-full'>
      <SignUpForm callbackUrl={callbackUrl || '/'} />
    </div>
  )
}

export default SignUpPage