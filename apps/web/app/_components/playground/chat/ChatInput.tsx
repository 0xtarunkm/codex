'use client';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SendHorizonalIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import Emoji from './Emoji';

export default function ChatInput() {
  const formSchema = z.object({
    message: z.string().min(1).max(1000),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      message: '',
    },
    resolver: zodResolver(formSchema),
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center space-x-4">
                  <button type="button" onClick={() => console.log('clicked')}>
                    <Emoji
                      onChange={(emoji: string) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </button>
                  <input
                    disabled={isLoading}
                    className="p-4 w-full rounded-md bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200 outline-none"
                    placeholder="Type a message"
                    {...field}
                  />
                  <button
                    type="button"
                    onClick={() => console.log('clicked')}
                    className=""
                  >
                    <SendHorizonalIcon className="h-6 w-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition hover:-rotate-45  duration-300" />
                  </button>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
