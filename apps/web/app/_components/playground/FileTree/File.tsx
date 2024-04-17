import { codeState } from '@/store/atom/codeAtom';
import { fileTreeDataState } from '@/store/atom/fileTreeDataAtom';
import { playgroundState } from '@/store/atom/playgroundAtom';
import axios from 'axios';
import {
  FileIcon,
  FilePlus2,
  FolderIcon,
  FolderPlus,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function File({ fileData }: { fileData: any }) {
  const [isOpen, setIsOpen] = useState(true);
  const code = useSetRecoilState(codeState);
  const playground = useRecoilValue(playgroundState);
  const [showInput, setShowInput] = useState({
    show: false,
    isDirectory: null,
  });
  const setFileTreeData = useSetRecoilState(fileTreeDataState);

  const fetchFileTreeData = async () => {
    try {
      const res = await axios.get(
        `http://api.${playground.title}.localhost/api/v1/files/all`
      );

      console.log(res.data.data);
      setFileTreeData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewNode = (e: any, isFolder: any) => {
    e.stopPropagation();
    setIsOpen(true);
    setShowInput({
      show: true,
      isDirectory: isFolder,
    });
  };

  const handleFileClick = async (e: any) => {
    e.stopPropagation();
    try {
      const res = await axios.post(
        `http://api.${playground.title}.localhost/api/v1/files/read`,
        {
          path: fileData.id,
        }
      );

      code({
        code: res.data.data,
        // extract the extension from the file name in fileData.id
        language: fileData.id.split('.').pop(),
        path: fileData.id,
        fileName: fileData.name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onAddNode = async (e: any) => {
    if (e.keyCode === 13 && e.target.value) {
      e.stopPropagation();
      if (e.keyCode === 13 && e.target.value !== '') {
        setShowInput({ ...showInput, show: false });

        if (showInput.isDirectory) {
          const res = await axios.post(
            `http://api.${playground.title}.localhost/api/v1/files/create-folder`,
            {
              path: `${fileData.id}/${e.target.value}`,
            }
          );

          fetchFileTreeData();
        } else {
          const res = await axios.post(
            `http://api.${playground.title}.localhost/api/v1/files/create`,
            {
              path: `${fileData.id}/${e.target.value}`,
              content: '',
            }
          );

          fetchFileTreeData();
        }
      }
    }
  };

  const onDeleteNode = async (e: any, isDirectory: boolean) => {
    e.stopPropagation();

    console.log(fileData.id);

    if (isDirectory) {
      const res = await axios.delete(
        `http://api.${playground.title}.localhost/api/v1/files/delete-folder`,
        {
          data: {
            path: fileData.id,
          },
        }
      );

      fetchFileTreeData();
    } else {
      const res = await axios.delete(
        `http://api.${playground.title}.localhost/api/v1/files/delete`,
        {
          data: {
            path: fileData.id,
          },
        }
      );

      fetchFileTreeData();
    }
  };

  if (fileData.isDirectory) {
    return (
      <div>
        <div>
          <span
            className="flex items-center justify-between cursor-pointer px-2 py-1 rounded-md group gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 mt-1 text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <div className="flex items-center space-x-3 group">
              <FolderIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition" />
              <p className="line-clamp-1 text-sm text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
                {fileData.name}
              </p>
            </div>
            <div className="hidden group-hover:flex items-center space-x-2">
              <FilePlus2
                className="h-4 w-4 text-zinc-500 dark:text-zinc-400 cursor-pointer"
                onClick={(e) => handleNewNode(e, false)}
              />
              <FolderPlus
                className="h-4 w-4 text-zinc-500 dark:text-zinc-400 cursor-pointer"
                onClick={(e) => handleNewNode(e, true)}
              />
              <Trash2
                className="h-4 w-4 text-zinc-500 dark:text-zinc-400 cursor-pointer"
                onClick={(e) => onDeleteNode(e, true)}
              />
            </div>
          </span>
        </div>

        <div
          style={{ display: isOpen ? 'block' : 'none', paddingLeft: '15px' }}
        >
          {showInput.show && (
            <div className="flex items-center space-x-2">
              {showInput.isDirectory ? (
                <FolderPlus className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer" />
              ) : (
                <FilePlus2 className="h-5 w-5 text-zinc-500 dark:text-zinc-400 cursor-pointer" />
              )}
              <input
                type="text"
                onKeyDown={onAddNode}
                className="w-full text-sm dark:bg-[#313338] dark:text-white bg-white border border-gray-300 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-zinc-500 transition"
                placeholder="file name"
                autoFocus
                onBlur={() => setShowInput({ ...showInput, show: false })}
              />
            </div>
          )}
          {fileData.children.map((child: any) => {
            return <File key={child.id} fileData={child} />;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <span className="flex items-center justify-between cursor-pointer px-2 py-1 rounded-md group gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1 mt-1 text-sm">
        <div className="flex items-center space-x-3" onClick={handleFileClick}>
          <FileIcon className="h-5 w-5 text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition" />
          <p className="line-clamp-1 text-sm text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition">
            {fileData.name}
          </p>
        </div>
        <div className="hidden group-hover:flex items-center space-x-2">
          <Trash2
            className="h-4 w-4 text-zinc-500 dark:text-zinc-400 cursor-pointer"
            onClick={(e) => onDeleteNode(e, false)}
          />
        </div>
      </span>
    );
  }
}
