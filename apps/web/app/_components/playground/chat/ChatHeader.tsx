import { Hash } from 'lucide-react';

export default function ChatHeader() {
  return (
    <div className="text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2">
      <Hash className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <span className="ml-2">nodejs-playground</span>
    </div>
  );
}
