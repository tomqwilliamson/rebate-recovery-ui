import { useEffect, useState } from 'react';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

export const useSignalR = (hubUrl: string) => {
  const [connection, setConnection] = useState<HubConnection | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl(hubUrl)
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnected(true);
        console.log('SignalR Connected');
      } catch (error) {
        console.error('SignalR Connection Error:', error);
        setConnected(false);
      }
    };

    startConnection();

    return () => {
      newConnection.stop();
      setConnected(false);
    };
  }, [hubUrl]);

  return { connection, connected };
};