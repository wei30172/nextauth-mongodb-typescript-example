"use client";

import { useForm } from "react-hook-form";
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { changePasswordValidation } from "@/lib/validations/auth"
import { ChangeUserPasswordParams } from "@/lib/actions/auth.actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import UserAvatar from "@/components/shared/user-avatar";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

interface ChangePasswordProps {
  changeUserPassword: (values: ChangeUserPasswordParams) => Promise<{success?: boolean}>}

function ChangePasswordForm({
  changeUserPassword
}: ChangePasswordProps) {
  const router = useRouter()
  const { pending } = useFormStatus()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof changePasswordValidation>>({
    resolver: zodResolver(changePasswordValidation),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  })

  const onSubmit = async (values: z.infer<typeof changePasswordValidation>) => {
    // console.log(values)
    const res = await changeUserPassword({
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    })

    if (res?.success) {
      toast({
        description: "Change password successfully, Please sign in again."
      })
      signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/signin`
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <UserAvatar />
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your old password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="your new password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your new password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your new password"
                    type="password"
                    {...field}
                  />
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
          {pending ? "Submitting..." : "Submit"}
        </Button>
        <Button
          onClick={() => router.back()}
          className="w-full mt-2"
          disabled={pending}
          variant="outline"
        >
          Cancel
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm