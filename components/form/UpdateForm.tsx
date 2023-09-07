'use client';

import { useForm } from 'react-hook-form';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { userUpdateValidation } from '@/lib/validations/user'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import UserAvatar from '@/components/shared/UserAvatar';
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface UpdateFormProps {
  updateUserProfile: any;
}

const UpdateForm: React.FC<UpdateFormProps> = ({updateUserProfile}) => {
  const { update } = useSession()
  const { pending } = useFormStatus()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof userUpdateValidation>>({
    resolver: zodResolver(userUpdateValidation),
    defaultValues: {
      name: '',
      // password: '',
      // confirmPassword: '',
    }
  })

  const onSubmit = async (values: z.infer<typeof userUpdateValidation>) => {
    update({name: values.name})
    // console.log(values)
    const res = await updateUserProfile(values)

    if (res.success) {
      toast({
        description: 'Update suceesfully.'
      })
    } else {
      toast({
        description: `${res.error || 'Update failed.'}`,
        variant: 'destructive'
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
          {/* <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type='password'
                    placeholder='your password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm your password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirm your password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
        </div>
        <Button
          className='w-full mt-6'
          type='submit'
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Update'}
        </Button>
      </form>
    </Form>
  )
}

export default UpdateForm