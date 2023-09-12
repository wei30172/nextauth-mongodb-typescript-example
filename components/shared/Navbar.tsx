import Link from 'next/link'

import MainNav from '@/components/shared/MainNav'
import UserNav from '@/components/shared/UserNav'
import ModeToggle from '@/components/shared/ModeToggle'
import { Code } from 'lucide-react'

async function Navbar() {
  return (
    <header className='w-full fixed z-10 top-0 bg-gray-100 dark:bg-gray-900 border-b border-gray-200'>
      <nav className='h-16 px-4 flex items-center'>
        <Link href='/'>
          <Code />
        </Link>
        <MainNav />
        <div className='ml-auto flex items-center space-x-4'>
          <ModeToggle />
          <UserNav />
        </div>
      </nav>
    </header>
  )
}

export default Navbar