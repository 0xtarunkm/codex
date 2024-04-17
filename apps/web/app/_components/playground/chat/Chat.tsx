import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { MessageSquareCodeIcon } from 'lucide-react';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';

export function Chat() {
  return (
    <Drawer>
      <DrawerTrigger className="flex items-center space-x-1">
        <MessageSquareCodeIcon className="h-6 w-6" />
        <span>Chat</span>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            <ChatHeader />
          </DrawerTitle>
          <div className="h-[350px]">
            <ChatMessages />
          </div>
        </DrawerHeader>
        <DrawerFooter>
          <div className="w-full">
            <ChatInput />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
