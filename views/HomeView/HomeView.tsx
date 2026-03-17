'use client';
import React, { useState } from 'react';
import InputChat from '@/views/HomeView/components/InputChat';
import MessageList from '@/views/HomeView/components/MessageList';
import { Message } from '@/types/Message.model';

const HomeView = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        text: trimmedText,
        role: 'user',
      },
    ]);
  };

  return (
    <div className="container flex h-full flex-col">
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} />
      </div>

      <div className="pb-4">
        <InputChat onSend={handleSendMessage} />
      </div>
    </div>
  );
};

export default HomeView;