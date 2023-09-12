'use client';

import { useForm } from 'react-hook-form';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { userUpdateValidation } from '@/lib/validations/auth'
import { UpdateUserProfileParams } from '@/lib/actions/auth.actions';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import UserAvatar from '@/components/shared/user-avatar';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface UpdateFormProps {
  updateUserProfile: (values: UpdateUserProfileParams) => Promise<{success?: boolean}>}

function UpdateForm({
  updateUserProfile
}: UpdateFormProps) {
  const { data: session, update } = useSession()
  const { pending } = useFormStatus()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userUpdateValidation>>({
    resolver: zodResolver(userUpdateValidation),
    defaultValues: {
      name: ''
    }
  })

  const onSubmit = async (values: z.infer<typeof userUpdateValidation>) => {
    update({name: values.name})
    // console.log(values)
    const res = await updateUserProfile(values)

    if (res?.success) {
      toast({
        description: 'Update successfully.'
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <UserAvatar />
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    placeholder='new username'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className='w-full mt-6'
          type='submit'
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Update'}
        </Button>
      </form>
      {session?.user.provider === 'credentials' && <>
        <div className='flex items-center justify-center mt-4 mb-8'>
          <div className='border-b border-gray-400 w-full'></div>
        </div>
        <p className='text-center text-sm text-gray-600 mt-2'>
          <Link className='text-blue-600 hover:underline' href='/change-password'>
            Change Password
          </Link>
        </p>
      </>}
    </Form>
  )
}

export default UpdateForm