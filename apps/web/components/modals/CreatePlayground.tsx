'use client';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Input } from '../ui/input';
import axios from 'axios';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CreatePlaygroundButton } from './CreatePlaygroundButton';
import { loadingState, playgroundState } from '@/store/atom/playgroundAtom';

export const CreatePlayground = () => {
  const router = useRouter();
  const setPlayground = useSetRecoilState(playgroundState);
  const setLoading = useSetRecoilState(loadingState);

  const [title, setTitle] = useState('');
  const [template, setTemplate] = useState('');

  const onSubmit = async (e: any) => {
    e.preventDefault();
    const res = await axios.post(
      'http://localhost:8000/api/v1/playground',
      {
        title: title.replace(/\s/g, '-'),
        template,
      },
      {
        withCredentials: true,
      }
    );

    setPlayground({
      id: res.data.id,
      title: res.data.title,
      template: res.data.template,
      userId: res.data.userId,
    });

    // setLoading(true);
    router.push(`/playground/new`);
    window.location.reload();
  };

  const selectOnChange = (e: any) => {
    setTemplate(e.target.value);
    console.log(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button>
          <CreatePlaygroundButton />
        </button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden dark:bg-[#313338]">
        <DialogHeader className="pt-2 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create Your Playground
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-8">
          <div className="space-y-8 px-6">
            <div className='className="space-y-3"'>
              <div className="font-bold">Title</div>

              <Input
                className="dark:bg-neutral-700 mt-2"
                placeholder="Enter Playground Name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <select
              value={template}
              onChange={selectOnChange}
              className="px-3 py-2 w-full dark:bg-neutral-700 dark:text-white border-1 border-gray-300 rounded-sm outline-none transition duration-300 hover:border-gray-500 focus:border-gray-500 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
            >
              <option value="" disabled selected>
                Select Template
              </option>

              <option value="nodejs">Nodejs</option>
              <option value="reactjs">Reactjs</option>
            </select>
          </div>

          <DialogFooter className="px-6 py-4">
            <Button
              variant={'outline'}
              className="font-semibold"
              onClick={onSubmit}
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
