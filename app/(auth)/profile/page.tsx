import UpdateForm from "@/components/form/update-form"
import { updateUserProfile } from "@/lib/actions/auth.actions"

const ProfilePage = async () => {
  return (
    <div className="w-full">
      <UpdateForm updateUserProfile={updateUserProfile} />
    </div>
  )
}


export default ProfilePage
