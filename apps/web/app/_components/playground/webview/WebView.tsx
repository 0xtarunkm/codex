'use client';

import { useRef } from 'react';

import { ArrowUpRightFromSquare, RefreshCw, RefreshCwIcon } from 'lucide-react';
import { useRecoilValue } from 'recoil';
import { playgroundTitleSelector } from '@/store/selector/playgroundSelector';
import { loadingState } from '@/store/atom/playgroundAtom';
import { Skeleton } from '@/components/ui/skeleton';

export default function WebView() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loading = useRecoilValue(loadingState);

  const title = useRecoilValue(playgroundTitleSelector);

  console.log('title', title);

  const handleOpenTab = () => {
    if (iframeRef.current) {
      window.open(iframeRef.current.src, '_blank');
    }
  };

  if (loading)
    return (
      <div className="">
        <Skeleton className="w-full h-screen bg-secondary rounded-md" />
      </div>
    );

  return (
    <div>
      <div className="flex items-center justify-between p-2 space-x-2">
        <RefreshCw
          className="cursor-pointer h-5 w-5"
          onClick={() => {
            if (iframeRef.current) {
              iframeRef.current.src = `http://app.${title}.localhost`;
            }
          }}
          role="button"
        />
        <input
          className="border-1 px-1 border-gray-300 dark:border-gray-700 rounded-sm w-full outline-none"
          placeholder={`app.${title}.localhost`}
          type="text"
          disabled
        />
        <div>
          <ArrowUpRightFromSquare
            className="cursor-pointer h-4 w-4"
            onClick={handleOpenTab}
            role="button"
          />
        </div>
      </div>
      <div className="h-screen">
        <iframe
          sandbox="allow-scripts allow-all"
          src={`http://app.${title}.localhost`}
          style={{ width: '100%', height: '100%' }}
          ref={iframeRef}
        />
      </div>
    </div>
  );
}
