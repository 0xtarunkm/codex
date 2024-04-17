'use client';

import { ChevronDown, TrashIcon } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../ui/dropdown-menu';
import { useRecoilValue } from 'recoil';
import {
  playgroundIdSelector,
  playgroundTitleSelector,
} from '@/store/selector/playgroundSelector';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function PlaygroundSidebarHeader() {
  const playgroundTitle = useRecoilValue(playgroundTitleSelector);
  const playgroundId = useRecoilValue(playgroundIdSelector);

  const router = useRouter();

  const handleDeleteProject = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/playground/${playgroundId}`,
        {
          withCredentials: true,
        }
      );

      window.location.reload();
      router.push('/playground/new');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button
          className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800
          border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md"
        >
          {playgroundTitle.replace(/\.playground$/, '')}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        <DropdownMenuItem className="px-3 py-2 text-sm cursor-pointer text-red-500">
          <button onClick={handleDeleteProject}>Delete Project</button>
          <TrashIcon className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
