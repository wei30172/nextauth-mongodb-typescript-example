import Link from "next/link"
import { getUserSession } from "@/lib/actions/auth.actions"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { buttonVariants } from "@/components/ui/button"
import SignOutButton from "@/components/button/signout-button"
import UserAvatar from "@/components/shared/user-avatar"

async function UserNav() {
  const { session } = await getUserSession()
  // console.log(session)

  return (
    <div>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger><UserAvatar /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/my-orders">
                My Orders
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link className={buttonVariants()} href="/signin">
          Sign in
        </Link>
      )}
    </div>
  )
}

export default UserNav