import ChangePasswordForm from '@/components/form/change-password-form'
import { changeUserPassword } from '@/lib/actions/auth.actions'

export default function ChangePasswordPage() {
  return (
    <div className='w-full'>
      <ChangePasswordForm changeUserPassword={changeUserPassword}/>
    </div>
  )
}