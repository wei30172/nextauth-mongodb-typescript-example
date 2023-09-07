interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({
  children
}: AuthLayoutProps) {
  return (
    <div className='bg-gray-100 p-8 rounded-md'>
      {children}
    </div>
  )
}