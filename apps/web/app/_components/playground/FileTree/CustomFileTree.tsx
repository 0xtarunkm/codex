'use client';

import { useEffect } from 'react';
import File from './File';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { loadingState, playgroundState } from '@/store/atom/playgroundAtom';
import { Skeleton } from '@/components/ui/skeleton';
import { fileTreeDataState } from '@/store/atom/fileTreeDataAtom';

import axios from 'axios';

export default function CustomFileTree() {
  const loading = useRecoilValue(loadingState);
  const fileTreeData = useRecoilValue(fileTreeDataState);

  const setFileTreeData = useSetRecoilState(fileTreeDataState);
  const playground = useRecoilValue(playgroundState);

  const fetchFileTreeData = async () => {
    try {
      const res = await axios.get(
        `http://api.${playground.title}.localhost/api/v1/files/all`
      );

      console.log(res.data.data);
      console.log('playground', playground);
      setFileTreeData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFileTreeData();
  }, [playground]);

  if (loading)
    return (
      <div className="">
        <Skeleton className="w-full h-screen bg-primary-foreground rounded-md" />
      </div>
    );

  return (
    <div className="p-4">
      <File fileData={fileTreeData} />
    </div>
  );
}
