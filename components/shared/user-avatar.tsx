"use client"
import { useSession } from "next-auth/react"

import { UserCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserAvatar = () => {
  const { data: session } = useSession()
  // console.log(session)

  return (
    <div>
      {session?.user?.image ? (
        <Avatar className="mx-auto w-8 h-8">
          <AvatarImage src={session.user.image} alt="user avatar" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <UserCircle2 className="mx-auto w-8 h-8"/>
      )}
      <p className="w-full text-center text-xs">{session?.user?.name}</p>
    </div>
  )
}

export default UserAvatar