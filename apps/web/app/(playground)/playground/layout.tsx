import { PlaygroundList } from '@/app/_components/playground/PlaygroundList';
import { Toaster } from '@/components/ui/toaster';
import { WebSocketProvider } from '@/context/WebSocketProvider';
import React from 'react';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      {/* <WebSocketProvider> */}
      <div className="hidden md:flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <PlaygroundList />
      </div>
      <main className="md:pl-[72px] h-full">{children}</main>
      <Toaster />
      {/* </WebSocketProvider> */}
    </div>
  );
}
