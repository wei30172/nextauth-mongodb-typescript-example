import UpdateForm from '@/components/form/UpdateForm'
import { updateUserProfile } from '@/lib/actions/user.actions'

const ProfilePage: React.FC = () => {
  return (
    <div className='w-full'>
      <UpdateForm updateUserProfile={updateUserProfile}/>
    </div>
  );
};

export default ProfilePage;