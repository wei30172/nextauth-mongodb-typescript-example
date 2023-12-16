"use client"

import { useForm } from "react-hook-form"
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
// 在最新版本的 react-dom 中，使用 useFormStatus 來管理表單狀態。
// import { useFormStatus } from 'react-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useSession } from "next-auth/react"
import { userUpdateValidation } from "@/lib/validations/auth"
import { UpdateUserProfileParams } from "@/lib/actions/auth.actions"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import UserAvatar from "@/components/shared/user-avatar"

interface UpdateFormProps {
  updateUserProfile: (values: UpdateUserProfileParams) => Promise<{success?: boolean}>
}

const UpdateForm = ({
  updateUserProfile
}: UpdateFormProps) => {
  const { data: session, update } = useSession()
  const { pending } = useFormStatus()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userUpdateValidation>>({
    resolver: zodResolver(userUpdateValidation),
    defaultValues: {
      name: "",
    }
  })

  async function onSubmit(values: z.infer<typeof userUpdateValidation>) {
    update({name: values.name})
    const res = await updateUserProfile(values)
    
    if (res?.success) {
      toast({
        description: "Update successfully."
      })
    }
  }

  return (
    <Form {...form}>
      <UserAvatar />
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="new username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full mt-6"
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Update"}
        </Button>
      </form>
      {session?.user.provider === "credentials" && <>
        <div className="flex items-center justify-center mt-4 mb-8">
          <div className="border-b border-gray-400 w-full"></div>
        </div>
        <p className="text-center text-sm text-gray-600 mt-2">
          <Link className="text-blue-600 hover:underline" href="/change-password">
            Change Password
          </Link>
        </p>
      </>}
    </Form>
  )
}

export default UpdateForm