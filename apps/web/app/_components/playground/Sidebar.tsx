'use client';

import {
  ChevronsLeft,
  HomeIcon,
  Terminal,
  PlusCircleIcon,
  User2Icon,
} from 'lucide-react';

import Item from './Item';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ModeToggle from '@/components/ThemeToggle';

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <>
      <aside className="group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col transition-all ease-in-out duration-300">
        <div className="space-y-4 mt-12 mx-2">
          <div>
            <Button variant={'outline'} className="w-full">
              <PlusCircleIcon className="shrink-0 h-[18px] mr-1 text-muted-foreground" />
              <span className="text-muted-foreground">Create Playground</span>
            </Button>
          </div>
          <div>
            <Item
              name="Home"
              onClick={() => {
                router.push('/home');
              }}
              icon={HomeIcon}
            />
          </div>
          <div>
            <Item
              name="Playgrounds"
              onClick={() => {
                router.push('/playgrounds');
              }}
              icon={Terminal}
            />
          </div>
          <div>
            <User2Icon className="shrink-0 h-[18px] mr-1" />
            Hello
          </div>
          <ModeToggle />
        </div>
      </aside>
    </>
  );
};
