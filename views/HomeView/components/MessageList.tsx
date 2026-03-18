import React from 'react';
import { Message } from '@/types/Message.model';
import MessageItem from '@/views/HomeView/components/MessageItem';

interface Props {
  messages: Message[];
}

const MessageList = ({ messages }: Props) => {
  return (
    <div
      className="h-full px-3 py-4"
    >
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <MessageItem message={message} key={message.id} />
        ))}
      </div>
    </div>
  );
};

export default MessageList;