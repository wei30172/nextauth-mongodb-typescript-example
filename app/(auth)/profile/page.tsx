import UpdateForm from "@/components/form/update-form"
import { updateUserProfile } from "@/lib/actions/auth.actions"

export default function ProfilePage() {
  return (
    <div className="w-full">
      <UpdateForm updateUserProfile={updateUserProfile}/>
    </div>
  )
}