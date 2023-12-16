import ChangePasswordForm from "@/components/form/change-password-form"
import { changeUserPassword } from "@/lib/actions/auth.actions"

const ChangePasswordPage = async () => {
  return (
    <div className="w-full">
      <ChangePasswordForm changeUserPassword={changeUserPassword} />
    </div>
  )
}


export default ChangePasswordPage