'use client';

import React, { use, useEffect, useState } from 'react';
import banner from './banner';
import init from './init.json';

import { useRecoilValue } from 'recoil';
import { playgroundTitleSelector } from '@/store/selector/playgroundSelector';
import { loadingState } from '@/store/atom/playgroundAtom';
import { Skeleton } from '@/components/ui/skeleton';

export default function CustomTerminal() {
  const [lines, setLines] = useState([{ value: banner }, ...init.commands]);
  const [command, setCommand] = useState('');
  const [cursorMoves, setCursorMoves] = useState(0);
  const [cursorPaused, setCursorPaused] = useState(false);
  const loading = useRecoilValue(loadingState);

  const playground = useRecoilValue(playgroundTitleSelector);

  const refInput = React.createRef<HTMLInputElement>();
  const refCommands = React.createRef<HTMLDivElement>();

  useEffect(() => {
    updateScroll();
  }, [lines]);

  function handleOnFocusSection() {
    refInput.current?.focus();
    setCursorPaused(false);
  }

  function handleOnBlurInput() {
    setCursorPaused(true);
  }

  function newLine() {
    const value = refInput.current?.value;

    refInput.current!.value = '';
    setCommand('');

    return value;
  }

  async function execute(command: string) {
    if (!command) return;

    const res = await fetch(
      `http://api.${playground}.localhost/api/v1/terminal/execute`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: playground, command }),
      }
    );

    const data = await res.json();

    console.log(data.data);

    // if (data.exitCode === 0) {
    //   return data.data;
    // } else {
    //   return data.stderr;
    // }
    return data.data;
  }

  function updateCursor(key: string) {
    switch (key) {
      case 'ArrowLeft':
        if (command.length > cursorMoves) {
          setCursorMoves(cursorMoves + 1);
        }
        break;
      case 'ArrowRight':
        if (cursorMoves > 0) {
          setCursorMoves(cursorMoves - 1);
        }
        break;
      case 'Delete':
        if (command.length >= cursorMoves) {
          setCursorMoves(cursorMoves - 1);
        }
        break;
      case 'Home':
        setCursorMoves(command.length);
        break;
      case 'End':
      case 'Enter':
        setCursorMoves(0);
        break;
      default:
        break;
    }
  }

  let timeoutCursor: any;

  function pauseCursor() {
    setCursorPaused(true);

    clearTimeout(timeoutCursor);

    timeoutCursor = setTimeout(() => {
      setCursorPaused(false);
    }, 500);
  }

  function updateScroll() {
    refCommands.current?.scrollIntoView(false);
  }

  async function handleKeyDown({ key }: React.KeyboardEvent<HTMLInputElement>) {
    pauseCursor();

    updateCursor(key);

    if (key === 'Enter') {
      const value = newLine();

      if (value === 'clear' || value === 'cls') {
        return setLines([]);
      }

      if (value?.startsWith('cd')) {
        return setLines([
          // @ts-ignore
          ...lines,
          // @ts-ignore
          { value: value, command: true },
          // @ts-ignore
          'cd command not allowed',
        ]);
      }

      const result = !value
        ? {}
        : value === 'banner'
          ? { value: banner.replace(/M/g, '<span>M</span>'), banner: true }
          : { value: await execute(value) };

      // @ts-ignore
      return setLines([...lines, { value: value, command: true }, result]);
    }
  }

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    setCommand(event.target.value);
  }

  function createMarkup(value: string) {
    return { __html: value };
  }

  function LineValue({ value }: { value: string }) {
    return <div dangerouslySetInnerHTML={createMarkup(value)} />;
  }

  if (loading)
    return (
      <div className="">
        <Skeleton className="w-full h-screen bg-primary-foreground rounded-md" />
      </div>
    );

  return (
    <div className="p-4 h-screen">
      <div className="font-mono" onClick={handleOnFocusSection}>
        {lines.map((line, index) => (
          <div key={index} className="text-sm font-mono my-2 overflow-y-scroll">
            <LineValue value={line.value} />
          </div>
        ))}
        <div ref={refCommands} />
        <div className="flex items-center space-x-2">
          <div className="text-sm">
            <span className="text-emerald-600">user@tensor:</span>
            <span className="">app$</span>
          </div>
          <input
            ref={refInput}
            type="text"
            value={command}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDown}
            onBlur={handleOnBlurInput}
            className="w-full outline-none bg-transparent text-sm"
          />
        </div>
      </div>
    </div>
  );
}
