'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Smile } from 'lucide-react';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';

export default function Emoji({
  onChange,
}: {
  onChange: (emoji: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger>
        <Smile className="h-6 w-6 text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition" />
      </PopoverTrigger>
      <PopoverContent
        side="left"
        sideOffset={40}
        className="bg-transparent border-none shadow-none mb-16"
      >
        <Picker
          data={data}
          defaultSize={80}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
        />
      </PopoverContent>
    </Popover>
  );
}
