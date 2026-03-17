'use client';
import React, { useEffect, useRef } from 'react';
import { Message } from '@/types/Message.model';
import MessageItem from '@/views/HomeView/components/MessageItem';

interface Props {
  messages: Message[];
}

const MessageList = ({ messages }: Props) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    containerRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, [messages]);

  return (
    <div
      className="h-full overflow-y-auto scrollbar-hidden px-3 py-4"
    >
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </div>
      <div ref={containerRef} />
    </div>
  );
};

export default MessageList;