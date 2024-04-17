'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';

import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/button';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '@/store/atom/userAtom';
import { useEffect } from 'react';

export default function LoginForm() {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);

  const formSchema = z.object({
    email: z.string().email().min(2, {
      message: 'Username must be at least 2 characters.',
    }),
    password: z.string().min(2, {
      message: 'Password must be at least 2 characters.',
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await axios.post('http://localhost:8000/api/v1/login', data, {
      withCredentials: true,
    });

    console.log(res.data);

    router.push('/playground/new');
  };

  return (
    <div className="space-y-4 w-full dark:bg-[#1E1F22] p-8 rounded-md">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormLabel className="text-2xl font-bold text-center">
            Login to your account
          </FormLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </Form>
      <div className="mx-auto flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>

      <p className="text-center text-sm mt-2">
        If you don&apos;t have an account, please&nbsp;
        <Link href="/register" className="text-purple-500 hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
}
