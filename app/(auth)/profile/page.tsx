import UpdateForm from '@/components/form/UpdateForm'
import { updateUserProfile } from '@/lib/actions/auth.actions'

export default function ProfilePage() {
  return (
    <div className='w-full'>
      <UpdateForm updateUserProfile={updateUserProfile}/>
    </div>
  )
}