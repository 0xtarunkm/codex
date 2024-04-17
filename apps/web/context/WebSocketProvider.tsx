'use client';

import {
  playgroundTitleSelector,
  playgroundUserIdSelector,
} from '@/store/selector/playgroundSelector';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';

interface WebSocketProviderProps {
  children: React.ReactNode;
}

interface WebSocketContextProps {
  sendMessage: (message: string) => void;
  sendCodeChanges: (code: string) => void;
}

const WebSocketContext = createContext<WebSocketContextProps | null>(null);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error('useWebSocket must be used within WebSocketProvider');
  }

  return context;
};

export const WebSocketProvider = ({ children }: WebSocketProviderProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const userId = useRecoilValue(playgroundUserIdSelector);
  const roomId = useRecoilValue(playgroundTitleSelector);
  // const code = useRecoilValue(codeSelector);

  console.log('userId', userId);
  console.log('roomId', roomId);

  const sendMessage = useCallback((message: string) => {
    ws?.send(
      JSON.stringify({
        type: 'chat',
        payload: {
          userId,
          roomId,
          message,
        },
      })
    );
  }, []);

  const sendCodeChanges = useCallback((code: string) => {
    ws?.send(
      JSON.stringify({
        type: 'code-changes',
        payload: {
          userId,
          roomId,
          code,
        },
      })
    );
  }, []);

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000');
    setWs(ws);

    console.log('userId', userId);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: 'join-room',
          payload: {
            userId,
            roomId,
          },
        })
      );
    };

    ws.onmessage = (message) => {
      console.log('received', message);
    };

    ws.onclose = () => {
      console.log('WebSocket Client Disconnected');
    };

    return () => {
      ws.close();
    };
  }, [roomId, userId]);

  return (
    <WebSocketContext.Provider value={{ sendMessage, sendCodeChanges }}>
      {children}
    </WebSocketContext.Provider>
  );
};
