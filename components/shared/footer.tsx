import Link from 'next/link'
import { footerLinks } from '@/constants'

import { Code } from 'lucide-react'

async function Footer() {
  return (
    <footer className='flex flex-col text-gray-500 text-sm mt-5 border-t border-gray-100'>
      <div className='flex flex-wrap justify-between max-sm:flex-col gap-8 px-6 py-10 sm:gap-20'>
        {footerLinks.map((item) => (
          <div key={item.title}>
            <h3 className='font-semibold text-gray-900 dark:text-gray-200'>{item.title}</h3>
            <div className='flex flex-col gap-2'>
              {item.links.map((link) => (
                <Link
                  key={link.title}
                  href={link.url}
                  className='md:text-xs'
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='flex items-center justify-between flex-wrap border-t border-gray-100 gap-8 p-4 sm:px-10'>
        <div className='flex items-center gap-4'>
          <Code />
          <p className='text-gray-900 dark:text-gray-200'>
            &copy; Web<br />
          </p>
        </div>
        <div className='flex max-sm:flex-col gap-4'>
          <Link href='/'>
            Privacy Notice
          </Link>
          <Link href='/'>
            Conditions of Use
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
