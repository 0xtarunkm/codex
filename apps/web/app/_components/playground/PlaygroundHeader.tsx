'use client';

import { LucideSave, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat } from './chat/Chat';
import PlaygroundSidebarHeader from '@/components/modals/PlaygroundSidebarHeader';
import { useRecoilValue } from 'recoil';
import { codeState } from '@/store/atom/codeAtom';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { playgroundTitleSelector } from '@/store/selector/playgroundSelector';
import { loadingState } from '@/store/atom/playgroundAtom';
import { Skeleton } from '@/components/ui/skeleton';

export default function PlaygroundHeader() {
  const code = useRecoilValue(codeState);
  const playground = useRecoilValue(playgroundTitleSelector);
  const loading = useRecoilValue(loadingState);
  const { toast } = useToast();

  const handleFileUpdate = async () => {
    try {
      const res = await axios.put(
        `http://api.${playground}.localhost/api/v1/files/update`,
        {
          path: code.path,
          content: code.code,
        }
      );

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading)
    return (
      <div className="">
        <Skeleton className="w-full h-24" />
      </div>
    );
  else {
    return (
      <nav className="flex items-center justify-between px-2 bg-secondary">
        <div className="w-[250px]">
          <PlaygroundSidebarHeader />
        </div>
        <Button
          variant={'outline'}
          className="dark:bg-neutral-700 bg-neutral-200 dark:hover:bg-emerald-500 hover:bg-emerald-500 hover:text-white transition hover:rounded-xl duration-300 font-semibold mx-auto"
        >
          Run
        </Button>
        <div className="flex items-center space-x-6">
          <Button
            variant="outline"
            onClick={() => {
              toast({
                title: `Room link copied to the clipboard `,
                description: 'Please share the link with your friends',
              });
            }}
            className=""
          >
            <Users className="h-4 w-4 mr-2" />
            Collaborate
          </Button>

          <Button variant={'outline'} onClick={handleFileUpdate}>
            <LucideSave className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Chat />
        </div>
      </nav>
    );
  }
}
