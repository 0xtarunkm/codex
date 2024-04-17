'use client';

import axios from 'axios';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useRouter } from 'next/navigation';
import ModeToggle from '@/components/ThemeToggle';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { CreatePlayground } from '@/components/modals/CreatePlayground';
import { loadingState, playgroundState } from '@/store/atom/playgroundAtom';
import { UserMenu } from '@/components/modals/UserMenu';
import { Skeleton } from '@/components/ui/skeleton';
import { playgroundTitleSelector } from '@/store/selector/playgroundSelector';

interface Playground {
  id: string;
  title: string;
  template: string;
  containerPort: number;
  containerImage: string;
}

export const PlaygroundList = () => {
  const [playgrounds, setPlaygrounds] = useState([]);
  const setPlayground = useSetRecoilState(playgroundState);
  const playgroundTitle = useRecoilValue(playgroundTitleSelector);
  const isLoading = useRecoilValue(loadingState);
  const setLoading = useSetRecoilState(loadingState);

  const router = useRouter();

  const getAllPlaygrounds = async () => {
    const res = await axios.get('http://localhost:8000/api/v1/playground', {
      withCredentials: true,
    });

    console.log(res.data);
    setPlaygrounds(res.data);
  };

  const handleClick = async (id: any) => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/playground/${id}`,
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
      router.push(`/playground/${res.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPlaygrounds();
  }, []);

  if (isLoading)
    return (
      <div className="">
        <Skeleton className="w-full h-screen bg-primary-foreground rounded-md" />
      </div>
    );

  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] py-3">
      <CreatePlayground />
      <Separator className="h-[2px] bg-zinc-200 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {playgrounds.map((playground: Playground) => {
          let imageURL = '';
          if (playground.template === 'nodejs') {
            imageURL = 'https://bit.ly/3SpNmvO';
          } else if (playground.template === 'typescript') {
            imageURL = 'https://bit.ly/48RCtZa';
          } else if (playground.template === 'reactjs') {
            imageURL = 'https://bit.ly/48Gy3o1';
          }
          return (
            <button
              onClick={() => handleClick(playground.id)}
              className="group flex items-center cursor-pointer mb-4"
              key={playground.id}
            >
              <div
                className="flex mx-3 h-[48px] w-[48px] rounded-[16px] group-hover:rounded-[24px] transition-all overflow-hidden items-center justify-center bg-background
            dark:bg-neutral-700 bg-neutral-200"
              >
                <Image
                  src={imageURL}
                  height={32}
                  width={32}
                  alt={playground.title}
                />
              </div>
            </button>
          );
        })}
      </ScrollArea>
      <div className="space-y-3 flex items-center flex-col">
        <Separator className="h-[2px] bg-zinc-200 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
        <UserMenu />
        <ModeToggle />
      </div>
    </div>
  );
};
