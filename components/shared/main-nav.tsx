"use client";

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { mainNavLinks } from "@/constants"
import { cn } from "@/lib/utils"

import { Menu } from "lucide-react"

function MainNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="flex items-center lg:space-x-6 mx-4">
      <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">
        <Menu />
      </button>
      <div className={cn(
        "absolute top-full left-0 w-full border bg-gray-100 dark:bg-gray-900",
        "lg:border-none lg:static lg:flex lg:space-x-6",
        menuOpen ? "block" : "hidden",
      )}>
        {mainNavLinks.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={cn(
              "block py-2 px-4 text-sm transition-colors hover:text-primary",
              pathname === link.url ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default MainNav