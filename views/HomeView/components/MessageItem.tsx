'use client';

import React from 'react';
import { Message } from '@/types/Message.model';
import TypingIndicator from '@/components/Animation/TypingIndicator';
import MessageUser from "@/views/HomeView/components/MessageUser";
import MessageAssistant from "@/views/HomeView/components/MessageAssistant";

interface Props {
  message: Message;
}

const MessageItem = ({ message }: Props) => {
  const isUser = message.role === 'user';

  if (message.role === 'assistant' && message.status === 'loading' && !message.content) {
    return (
      <div className="h-10 flex items-center">
        <TypingIndicator />
      </div>
    );
  }

  if (isUser) {
    return <MessageUser content={message.content} attachments={message?.attachments} />
  }

  return <MessageAssistant content={message.content} />
};

export default MessageItem;