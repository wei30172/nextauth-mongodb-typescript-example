'use client'
 
import * as React from 'react'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
 
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'

export default function ModeToggle() {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()
 
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null
  
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  }

  return (
    <Button variant='outline' size='icon' onClick={toggleTheme}>
      <Sun className={`h-[1.2rem] w-[1.2rem] ${theme === 'dark' ? 'block' : 'hidden'}`} />
      <Moon className={`h-[1.2rem] w-[1.2rem] ${theme !== 'dark' ? 'block' : 'hidden'}`} />
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}