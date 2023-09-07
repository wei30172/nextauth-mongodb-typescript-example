import Link from 'next/link'
import { Code } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import SignOutButton from '@/components/button/SignOutButton'
import { getUserSession } from '@/lib/actions/user.actions'

async function Navbar() {
  const { session } = await getUserSession()
  // console.log(session)

  return (
    <div className=' bg-gray-100 w-full py-2 border-b border-gray-200 fixed z-10 top-0'>
      <div className='container flex items-center justify-between'>
        <Link href='/'>
          <Code />
        </Link>
        <Link href='/dashboard'>
          Dashboard
        </Link>
        {session ? (
          <>
            <Link href='/profile'>
              Profile
            </Link>
            <SignOutButton />
          </>
        ) : (
          <Link className={buttonVariants()} href='/signin'>
            Sign in
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar