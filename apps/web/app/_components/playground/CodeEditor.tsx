'use client';

import { useRef } from 'react';
import { useTheme } from 'next-themes';

import Editor from '@monaco-editor/react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { codeState } from '@/store/atom/codeAtom';
import axios from 'axios';
import { playgroundState } from '@/store/atom/playgroundAtom';

const CodeEditorWindow = () => {
  const code = useRecoilValue(codeState);
  const playground = useRecoilValue(playgroundState);
  const setCode = useSetRecoilState(codeState);
  const editorRef = useRef<any>(null);

  const { theme } = useTheme();

  // const { sendCodeChanges } = useWebSocket();

  // useEffect(() => {
  //   sendCodeChanges(code.code);
  // }, [code.code]);

  let lang = '';
  if (code.language === 'jsx' || code.language === 'js') {
    lang = 'javascript';
  } else if (code.language === 'tsx' || code.language === 'ts') {
    lang = 'typescript';
  } else if (code.language === 'css') {
    lang = 'css';
  } else if (code.language === 'html') {
    lang = 'html';
  } else if (code.language === 'json') {
    lang = 'json';
  } else if (code.language === 'md') {
    lang = 'markdown';
  }

  const handleFileUpdate = async () => {
    try {
      const res = await axios.put(
        `http://api.${playground.title}.localhost/api/v1/files/update`,
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

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height={`100%`}
        width={`100%`}
        language={lang}
        value={code.code}
        theme={`${theme === 'dark' ? 'vs-dark' : 'vs-light'}`}
        options={{
          fontSize: 14,
        }}
        defaultValue={''}
        onChange={(value) => {
          setCode({
            ...code,
            code: value!,
          });
          // sendCodeChanges(value!);
        }}
        onMount={(editor) => {
          editorRef.current = editor;
          editor.onKeyDown((e: any) => {
            console.log(e);
            if (
              e.key === 's' &&
              (navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey)
            ) {
              e.preventDefault();
              handleFileUpdate();
            }
          });
        }}
      />
    </div>
  );
};
export default CodeEditorWindow;
