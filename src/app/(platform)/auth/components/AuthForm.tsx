'use client';

import { register } from '@/actions/auth';
import { RegisterSchema } from '@/actions/auth/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAction } from '@/hooks/useAction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

type Variant = 'SIGNIN' | 'SIGNUP';

const AuthForm = () => {
  const session = useSession();
  const router = useRouter();
  const { toast } = useToast();
  const [variant, setVariant] = useState<Variant>('SIGNIN');
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      variant: true,
      name: '',
      email: '',
      password: '',
    },
  });

  const { execute } = useAction(register, {
    onError: (error) => {
      toast({
        variant: 'destructive',
        description: error,
      });
    },
  });

  const onSubmit: SubmitHandler<
    z.infer<typeof RegisterSchema>
  > = (data) => {
    setIsLoading(true);
    if (variant === 'SIGNUP') {
      execute(data)
        .then(() => signIn('credentials', data))
        .then((callback) => {
          if (callback?.error) {
            toast({
              variant: 'destructive',
              title: 'Invalid Credentials',
            });
          }
          if (callback?.ok && !callback?.error) {
            toast({
              title: 'Signed In',
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
    if (variant === 'SIGNIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast({
              variant: 'destructive',
              title: 'Invalid Credentials',
            });
          }
          if (callback?.ok && !callback?.error) {
            toast({
              title: 'Signed In',
            });
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  const toggleVariant = useCallback(() => {
    if (variant === 'SIGNIN') {
      setVariant('SIGNUP');
      form.setValue('variant', true);
    } else {
      setVariant('SIGNIN');
      form.setValue('variant', false);
    }
  }, [form, variant]);

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast({
            variant: 'destructive',
            title: 'Invalid Credentials',
          });
        }
        if (callback?.ok && !callback?.error) {
          toast({
            title: 'Signed In',
          });
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (session?.status === 'authenticated') {
      console.log('authenticated');
      router.push('/');
    }
  }, [session?.status, router]);

  return (
    <div className='bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          {variant === 'SIGNUP' && (
            <FormField
              control={form.control}
              name='name'
              disabled={isLoading}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='4ry1337'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <FormField
            control={form.control}
            name='email'
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder='joemama@gmail.com'
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
            disabled={isLoading}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button
              disabled={isLoading}
              className='w-full'
              type='submit'
            >
              {variant === 'SIGNIN' ? 'Sign In' : 'Sign Up'}
            </Button>
          </div>
        </form>
      </Form>
      <div className='mt-6'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center'>
            <div className='boder-gray-300 w-full border-t' />
          </div>
          <div className='relative flex justify-center text-sm'>
            <span className='bg-white px-2 text-gray-500'>
              Or continue with
            </span>
          </div>
        </div>
        <div className='mt-6 flex gap-2'>
          <Button
            className='w-full'
            disabled={isLoading}
            onClick={() => socialAction('github')}
          >
            <Github />
            <span className='ml-2 text-sm font-medium'>
              Github
            </span>
          </Button>
        </div>
      </div>
      <div className='mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500'>
        <div>
          {variant === 'SIGNIN'
            ? 'New to task manager?'
            : 'Already have an account?'}
        </div>
        <div
          onClick={toggleVariant}
          className='cursor-pointer underline'
        >
          {variant === 'SIGNIN'
            ? 'Create an account'
            : 'Sign In'}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
