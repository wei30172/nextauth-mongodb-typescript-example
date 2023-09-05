interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className='bg-gray-100 p-8 rounded-md'>
      {children}
    </div>
  )
}

export default AuthLayout;