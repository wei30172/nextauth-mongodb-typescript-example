import { Button } from '@/components/ui/button';

interface GoogleSignInButtonProps {
  children: React.ReactNode;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ children }) => {
  const loginWithGoogle = async () => {
    console.log('loginWithGoogle')
  };

  return (
    <Button onClick={loginWithGoogle} className='w-full'>
      {children}
    </Button>
  );
};

export default GoogleSignInButton;