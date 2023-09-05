'use client';

import { useForm } from 'react-hook-form';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserSignInValidation } from '@/lib/validations/user'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import GoogleSignInButton from '@/components/button/GoogleSignInButton'
import { useToast } from '@/components/ui/use-toast'

const SignInForm: React.FC = () => {
  const { pending } = useFormStatus()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof UserSignInValidation>>({
    resolver: zodResolver(UserSignInValidation),
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (values: z.infer<typeof UserSignInValidation>) => {
    console.log(values)
    toast({
      description: 'Sign in suceesfully.'
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <div className='space-y-2'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='mail@example.com'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
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
        </div>
        <Button
          className='w-full mt-6'
          type='submit'
          disabled={pending}
        >
          {pending ? 'Submitting...' : 'Sign in'}
        </Button>
      </form>
      <div className='flex items-center justify-center my-4'>
        <div className='border-b border-gray-400 w-full'></div>
        <span className='px-2 text-gray-400'>or</span>
        <div className='border-b border-gray-400 w-full'></div>
      </div>
      <GoogleSignInButton>
        Sign in with Google
      </GoogleSignInButton>
      <p className='text-center text-sm text-gray-600 mt-2'>
        Don&apos;t have an account?&nbsp;
        <Link className='text-blue-600 hover:underline' href='/signup'>
          Sign up
        </Link>
      </p>
    </Form>
  );
};

export default SignInForm;