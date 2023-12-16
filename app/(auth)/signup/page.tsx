import { signUpWithCredentials } from "@/lib/actions/auth.actions"
import SignUpForm from "@/components/form/signup-form"

interface SignUpPageProps {
  searchParams: {
    callbackUrl: string
  }
}

const SignUpPage = ({
  searchParams: { callbackUrl }
}: SignUpPageProps) => {
  return (
    <div className="w-full">
      <SignUpForm
        callbackUrl={callbackUrl || "/"}
        signUpWithCredentials={signUpWithCredentials}
      />
    </div>
  )
}

export default SignUpPage